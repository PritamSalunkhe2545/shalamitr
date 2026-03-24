import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { feeRecordSchema } from "@/lib/validations/fee"
import { generateReceiptNumber, getAcademicYear } from "@/lib/utils"
import { CURRENT_ACADEMIC_YEAR } from "@/lib/constants"

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const academicYear = searchParams.get("year") ?? CURRENT_ACADEMIC_YEAR

  const records = await prisma.feeRecord.findMany({
    where: { academicYear },
    include: {
      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          className: true,
          rollNumber: true,
        },
      },
    },
    orderBy: { paymentDate: "desc" },
  })

  return NextResponse.json(records)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = feeRecordSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { data } = parsed

  // Generate receipt number: RCPT-2025-0001
  const year = data.academicYear.split("-")[0]
  const lastRecord = await prisma.feeRecord.findFirst({
    where: { receiptNumber: { startsWith: `RCPT-${year}-` } },
    orderBy: { receiptNumber: "desc" },
  })
  const lastSeq = lastRecord
    ? parseInt(lastRecord.receiptNumber.split("-")[2])
    : 0
  const receiptNumber = generateReceiptNumber(year, lastSeq + 1)

  const record = await prisma.feeRecord.create({
    data: {
      ...data,
      receiptNumber,
      recordedBy: userId,
    },
  })

  return NextResponse.json(record, { status: 201 })
}
