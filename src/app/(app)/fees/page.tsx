import Link from "next/link"

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fees</h1>
          <p className="text-muted-foreground">Track and manage fee payments</p>
        </div>
        <Link
          href="/fees/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Record Payment
        </Link>
      </div>
      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        Fee management coming soon
      </div>
    </div>
  )
}
