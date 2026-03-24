export default function StudentProfilePage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Profile</h1>
        <p className="text-muted-foreground">Student ID: {params.id}</p>
      </div>
      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        Student profile coming soon
      </div>
    </div>
  )
}
