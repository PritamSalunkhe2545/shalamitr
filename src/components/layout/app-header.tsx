"use client"

import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/students": "Students",
  "/students/new": "Add Student",
  "/fees": "Fees",
  "/fees/new": "Record Payment",
  "/attendance": "Attendance",
  "/certificates": "Certificates",
}

// Only load Clerk's UserButton when Clerk is actually configured
const ClerkUserButton = dynamic(
  () =>
    import("@clerk/nextjs").then((mod) => ({
      default: mod.UserButton,
    })),
  {
    ssr: false,
    loading: () => <PlaceholderAvatar />,
  }
)

function PlaceholderAvatar() {
  return (
    <Avatar className="h-8 w-8">
      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
        PS
      </AvatarFallback>
    </Avatar>
  )
}

const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export function AppHeader() {
  const pathname = usePathname()
  const label = routeLabels[pathname] ?? "Shalamitr"

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <span className="font-medium text-sm">{label}</span>
      <div className="ml-auto">
        {hasClerk ? <ClerkUserButton /> : <PlaceholderAvatar />}
      </div>
    </header>
  )
}
