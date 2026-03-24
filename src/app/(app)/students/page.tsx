import Link from "next/link"

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage student records</p>
        </div>
        <Link
          href="/students/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Add Student
        </Link>
      </div>
      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        Student list coming soon
      </div>
    </div>
  )
}
