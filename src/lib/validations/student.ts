import { z } from "zod"
import { CLASS_LIST, SECTIONS } from "@/lib/constants"

export const studentSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  dateOfBirth: z.coerce.date(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"] as const),
  photoUrl: z.string().url().optional().or(z.literal("")),

  rollNumber: z.string().min(1, "Roll number is required"),
  className: z.enum(CLASS_LIST),
  section: z.enum(SECTIONS).default("A"),
  admissionNumber: z.string().min(1, "Admission number is required"),
  admissionDate: z.coerce.date().default(() => new Date()),

  address: z.string().min(1, "Address is required"),
  city: z.string().default("Dondaicha"),
  state: z.string().default("Maharashtra"),
  pincode: z.string().optional(),

  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  guardianPhone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15),
  alternatePhone: z.string().optional(),
  guardianEmail: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),

  status: z.enum(["ACTIVE", "INACTIVE", "TRANSFERRED"] as const).default("ACTIVE"),
  leavingDate: z.coerce.date().optional(),
  leavingReason: z.string().optional(),
})

export type StudentInput = z.infer<typeof studentSchema>
