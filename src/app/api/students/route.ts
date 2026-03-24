import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { studentSchema } from "@/lib/validations/student"

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const search = searchParams.get("search") ?? ""
  const className = searchParams.get("class") ?? undefined
  const status = searchParams.get("status") ?? "ACTIVE"

  const students = await prisma.student.findMany({
    where: {
      status: status as "ACTIVE" | "INACTIVE" | "TRANSFERRED",
      className: className,
      OR: search
        ? [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { rollNumber: { contains: search, mode: "insensitive" } },
            { admissionNumber: { contains: search, mode: "insensitive" } },
          ]
        : undefined,
    },
    orderBy: [{ className: "asc" }, { rollNumber: "asc" }],
  })

  return NextResponse.json(students)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = studentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const student = await prisma.student.create({ data: parsed.data })
  return NextResponse.json(student, { status: 201 })
}
