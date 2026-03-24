import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { studentId: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const records = await prisma.feeRecord.findMany({
    where: { studentId: params.studentId },
    orderBy: { paymentDate: "desc" },
  })

  const totalPaid = records.reduce(
    (sum: number, r) => sum + Number(r.amount),
    0
  )

  return NextResponse.json({ records, totalPaid })
}
