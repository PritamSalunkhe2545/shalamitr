export default function ClassAttendancePage({
  params,
}: {
  params: { classId: string }
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mark Attendance</h1>
        <p className="text-muted-foreground">Class: {params.classId}</p>
      </div>
      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        Attendance grid coming soon
      </div>
    </div>
  )
}
