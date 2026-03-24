"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/students": "Students",
  "/students/new": "Add Student",
  "/fees": "Fees",
  "/fees/new": "Record Payment",
  "/attendance": "Attendance",
  "/certificates": "Certificates",
}

export function AppHeader() {
  const pathname = usePathname()
  const label = routeLabels[pathname] ?? "Shalamitr"

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <span className="font-medium text-sm">{label}</span>
      <div className="ml-auto">
        <UserButton />
      </div>
    </header>
  )
}
