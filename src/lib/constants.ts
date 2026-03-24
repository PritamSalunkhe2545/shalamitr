export const CLASS_LIST = [
  "Nursery",
  "LKG",
  "UKG",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
] as const

export type ClassName = (typeof CLASS_LIST)[number]

export const SECTIONS = ["A", "B"] as const

export type Section = (typeof SECTIONS)[number]

export const CURRENT_ACADEMIC_YEAR = "2024-25"

export const SCHOOL = {
  name: process.env.SCHOOL_NAME ?? "Jijau English School",
  address: process.env.SCHOOL_ADDRESS ?? "Bamhane, Dondaicha, Maharashtra",
  phone: process.env.SCHOOL_PHONE ?? "",
} as const

export const PAYMENT_METHODS = ["Cash", "UPI", "Cheque", "Bank Transfer"] as const

export const ATTENDANCE_STATUSES = ["PRESENT", "ABSENT", "LATE", "HOLIDAY"] as const
