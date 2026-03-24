export default function EditStudentPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Student</h1>
        <p className="text-muted-foreground">Student ID: {params.id}</p>
      </div>
      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        Edit student form coming soon
      </div>
    </div>
  )
}
