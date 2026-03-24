import { z } from "zod"
import { PAYMENT_METHODS } from "@/lib/constants"

export const feeRecordSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  amount: z.coerce
    .number()
    .positive("Amount must be positive"),
  paymentDate: z.coerce.date().default(() => new Date()),
  academicYear: z.string().min(1, "Academic year is required"),
  paymentMethod: z.enum(PAYMENT_METHODS).optional(),
  remarks: z.string().optional(),
})

export type FeeRecordInput = z.infer<typeof feeRecordSchema>

export const feeStructureSchema = z.object({
  className: z.string().min(1, "Class is required"),
  academicYear: z.string().min(1, "Academic year is required"),
  totalAmount: z.coerce.number().positive("Amount must be positive"),
  description: z.string().optional(),
})

export type FeeStructureInput = z.infer<typeof feeStructureSchema>
