export default function StudentFeePage({
  params,
}: {
  params: { studentId: string }
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Fee History</h1>
        <p className="text-muted-foreground">Student ID: {params.studentId}</p>
      </div>
      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        Fee history coming soon
      </div>
    </div>
  )
}
