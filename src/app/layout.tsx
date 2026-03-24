import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Shalamitr — Jijau English School",
  description: "School management system for Jijau English School",
}

// Conditionally wrap with ClerkProvider only when keys are configured
async function MaybeClerkProvider({ children }: { children: React.ReactNode }) {
  const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  if (hasClerk) {
    const { ClerkProvider } = await import("@clerk/nextjs")
    return <ClerkProvider>{children}</ClerkProvider>
  }
  return <>{children}</>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MaybeClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="font-sans antialiased">{children}</body>
      </html>
    </MaybeClerkProvider>
  )
}
