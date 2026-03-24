import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | string): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount))
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}

export function generateReceiptNumber(year: string, sequence: number): string {
  return `RCPT-${year}-${String(sequence).padStart(4, "0")}`
}

export function generateSerialNumber(
  type: "BON" | "LVG",
  year: string,
  sequence: number
): string {
  return `${type}-${year}-${String(sequence).padStart(4, "0")}`
}

export function getAcademicYear(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  // Academic year in India: June to May
  if (month >= 6) {
    return `${year}-${String(year + 1).slice(2)}`
  }
  return `${year - 1}-${String(year).slice(2)}`
}
