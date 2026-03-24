import { z } from "zod"

export const attendanceEntrySchema = z.object({
  studentId: z.string().min(1),
  status: z.enum(["PRESENT", "ABSENT", "LATE", "HOLIDAY"] as const),
  remarks: z.string().optional(),
})

export const markAttendanceSchema = z.object({
  date: z.coerce.date(),
  className: z.string().min(1, "Class is required"),
  section: z.string().default("A"),
  entries: z.array(attendanceEntrySchema).min(1, "At least one entry required"),
})

export type AttendanceEntry = z.infer<typeof attendanceEntrySchema>
export type MarkAttendanceInput = z.infer<typeof markAttendanceSchema>
