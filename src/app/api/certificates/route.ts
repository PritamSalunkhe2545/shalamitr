import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateSerialNumber } from "@/lib/utils"
import { z } from "zod"

const generateCertificateSchema = z.object({
  studentId: z.string().min(1),
  type: z.enum(["BONAFIDE", "LEAVING"]),
})

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get("studentId")

  const certs = await prisma.certificate.findMany({
    where: studentId ? { studentId } : undefined,
    include: {
      student: {
        select: { id: true, firstName: true, lastName: true, className: true },
      },
    },
    orderBy: { issuedDate: "desc" },
  })

  return NextResponse.json(certs)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = generateCertificateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { studentId, type } = parsed.data

  const student = await prisma.student.findUnique({ where: { id: studentId } })
  if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 })

  // Generate serial number
  const year = new Date().getFullYear().toString()
  const prefix = type === "BONAFIDE" ? "BON" : "LVG"
  const lastCert = await prisma.certificate.findFirst({
    where: { serialNumber: { startsWith: `${prefix}-${year}-` } },
    orderBy: { serialNumber: "desc" },
  })
  const lastSeq = lastCert
    ? parseInt(lastCert.serialNumber.split("-")[2])
    : 0
  const serialNumber = generateSerialNumber(prefix, year, lastSeq + 1)

  // Snapshot student data at time of generation
  const snapshotData = {
    firstName: student.firstName,
    lastName: student.lastName,
    dateOfBirth: student.dateOfBirth,
    gender: student.gender,
    className: student.className,
    section: student.section,
    admissionNumber: student.admissionNumber,
    admissionDate: student.admissionDate,
    fatherName: student.fatherName,
    motherName: student.motherName,
    address: student.address,
    city: student.city,
    state: student.state,
    leavingDate: student.leavingDate,
    leavingReason: student.leavingReason,
  }

  const cert = await prisma.certificate.create({
    data: {
      studentId,
      type,
      snapshotData,
      serialNumber,
      issuedBy: userId,
    },
  })

  return NextResponse.json(cert, { status: 201 })
}
