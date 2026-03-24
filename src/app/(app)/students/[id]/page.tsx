import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StudentProfilePage({
  params,
}: {
  params: { id: string }
}) {
  // Sample data for demo
  const student = {
    id: params.id,
    firstName: "Aarav",
    lastName: "Patil",
    admissionNumber: "ADM-2024-001",
    className: "5",
    section: "A",
    rollNumber: "1",
    gender: "MALE",
    dateOfBirth: "2015-06-15",
    admissionDate: "2024-06-01",
    status: "ACTIVE",
    fatherName: "Rajesh Patil",
    motherName: "Sunita Patil",
    guardianPhone: "9876543210",
    address: "123 Main Road, Bamhane",
    city: "Dondaicha",
    state: "Maharashtra",
    pincode: "425408",
  }

  const feeHistory = [
    { receipt: "RCPT-2025-0012", date: "2025-01-15", amount: 2500, method: "UPI" },
    { receipt: "RCPT-2024-0087", date: "2024-10-05", amount: 2500, method: "Cash" },
  ]

  const recentAttendance = [
    { date: "2025-03-24", status: "PRESENT" },
    { date: "2025-03-23", status: "PRESENT" },
    { date: "2025-03-22", status: "ABSENT" },
    { date: "2025-03-21", status: "PRESENT" },
    { date: "2025-03-20", status: "LATE" },
  ]

  const attendanceColors: Record<string, string> = {
    PRESENT: "bg-green-500",
    ABSENT: "bg-red-500",
    LATE: "bg-yellow-500",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {student.firstName} {student.lastName}
          </h1>
          <p className="text-muted-foreground">
            {student.admissionNumber} &middot; Class {student.className}
            {student.section} &middot; Roll {student.rollNumber}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/students/${params.id}/edit`}
            className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Edit
          </Link>
          <Link
            href="/students"
            className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Back to List
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Personal Details
              <Badge>{student.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <dt className="text-muted-foreground">Full Name</dt>
              <dd className="font-medium">{student.firstName} {student.lastName}</dd>
              <dt className="text-muted-foreground">Date of Birth</dt>
              <dd>{student.dateOfBirth}</dd>
              <dt className="text-muted-foreground">Gender</dt>
              <dd>{student.gender}</dd>
              <dt className="text-muted-foreground">Admission Date</dt>
              <dd>{student.admissionDate}</dd>
            </dl>
          </CardContent>
        </Card>

        {/* Guardian Details */}
        <Card>
          <CardHeader>
            <CardTitle>Guardian Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <dt className="text-muted-foreground">Father</dt>
              <dd className="font-medium">{student.fatherName}</dd>
              <dt className="text-muted-foreground">Mother</dt>
              <dd className="font-medium">{student.motherName}</dd>
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="font-mono">{student.guardianPhone}</dd>
              <dt className="text-muted-foreground">Address</dt>
              <dd>{student.address}, {student.city} {student.pincode}</dd>
            </dl>
          </CardContent>
        </Card>

        {/* Fee History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Fee History
              <span className="text-sm font-normal text-muted-foreground">
                Total Paid: {"\u20B9"}5,000 / {"\u20B9"}5,000
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-2 font-medium text-muted-foreground">Receipt</th>
                  <th className="text-left pb-2 font-medium text-muted-foreground">Date</th>
                  <th className="text-right pb-2 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left pb-2 font-medium text-muted-foreground">Method</th>
                </tr>
              </thead>
              <tbody>
                {feeHistory.map((f) => (
                  <tr key={f.receipt} className="border-b last:border-0">
                    <td className="py-2 font-mono text-xs">{f.receipt}</td>
                    <td className="py-2">{f.date}</td>
                    <td className="py-2 text-right">{"\u20B9"}{f.amount.toLocaleString("en-IN")}</td>
                    <td className="py-2">{f.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {recentAttendance.map((a) => (
                <div key={a.date} className="text-center">
                  <div
                    className={`w-8 h-8 rounded-md ${attendanceColors[a.status]} flex items-center justify-center`}
                  >
                    <span className="text-white text-xs font-bold">
                      {a.status[0]}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {a.date.slice(5)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              This month: 18/22 days present (81.8%)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
