export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">Mark and view class attendance</p>
      </div>
      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        Select a class to mark attendance
      </div>
    </div>
  )
}
