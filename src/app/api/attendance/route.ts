import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { markAttendanceSchema } from "@/lib/validations/attendance"

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const date = searchParams.get("date")
  const className = searchParams.get("class")
  const studentId = searchParams.get("studentId")

  const records = await prisma.attendance.findMany({
    where: {
      date: date ? new Date(date) : undefined,
      studentId: studentId ?? undefined,
      student: className ? { className } : undefined,
    },
    include: {
      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          rollNumber: true,
          className: true,
        },
      },
    },
    orderBy: [{ date: "desc" }],
  })

  return NextResponse.json(records)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = markAttendanceSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { date, entries } = parsed.data

  // Bulk upsert in a single transaction
  const upserts = entries.map((entry) =>
    prisma.attendance.upsert({
      where: {
        studentId_date: { studentId: entry.studentId, date },
      },
      update: {
        status: entry.status,
        remarks: entry.remarks,
        markedBy: userId,
      },
      create: {
        studentId: entry.studentId,
        date,
        status: entry.status,
        remarks: entry.remarks,
        markedBy: userId,
      },
    })
  )

  const results = await prisma.$transaction(upserts)
  return NextResponse.json({ count: results.length })
}
