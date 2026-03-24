import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { studentSchema } from "@/lib/validations/student"

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const student = await prisma.student.findUnique({ where: { id: params.id } })
  if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(student)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = studentSchema.partial().safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const student = await prisma.student.update({
    where: { id: params.id },
    data: parsed.data,
  })
  return NextResponse.json(student)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Soft delete — set status to INACTIVE
  const student = await prisma.student.update({
    where: { id: params.id },
    data: { status: "INACTIVE" },
  })
  return NextResponse.json(student)
}
