import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

const sampleStudents = [
  { id: "1", admNo: "ADM-2024-001", name: "Aarav Patil", class: "5", section: "A", roll: "1", gender: "M", phone: "9876543210", status: "ACTIVE" as const },
  { id: "2", admNo: "ADM-2024-002", name: "Priya Deshmukh", class: "Nursery", section: "A", roll: "3", gender: "F", phone: "9876543211", status: "ACTIVE" as const },
  { id: "3", admNo: "ADM-2024-003", name: "Ravi Sharma", class: "8", section: "A", roll: "2", gender: "M", phone: "9876543212", status: "ACTIVE" as const },
  { id: "4", admNo: "ADM-2024-004", name: "Sneha Kulkarni", class: "2", section: "A", roll: "5", gender: "F", phone: "9876543213", status: "ACTIVE" as const },
  { id: "5", admNo: "ADM-2024-005", name: "Arjun More", class: "3", section: "A", roll: "4", gender: "M", phone: "9876543214", status: "ACTIVE" as const },
  { id: "6", admNo: "ADM-2023-042", name: "Ananya Bhosale", class: "7", section: "A", roll: "1", gender: "F", phone: "9876543215", status: "ACTIVE" as const },
  { id: "7", admNo: "ADM-2023-038", name: "Vedant Jadhav", class: "6", section: "A", roll: "3", gender: "M", phone: "9876543216", status: "ACTIVE" as const },
  { id: "8", admNo: "ADM-2022-019", name: "Ishaan Pawar", class: "4", section: "A", roll: "2", gender: "M", phone: "9876543217", status: "TRANSFERRED" as const },
  { id: "9", admNo: "ADM-2024-006", name: "Diya Chavan", class: "LKG", section: "A", roll: "7", gender: "F", phone: "9876543218", status: "ACTIVE" as const },
  { id: "10", admNo: "ADM-2024-007", name: "Kavya Shinde", class: "UKG", section: "A", roll: "2", gender: "F", phone: "9876543219", status: "ACTIVE" as const },
  { id: "11", admNo: "ADM-2024-008", name: "Om Gaikwad", class: "1", section: "A", roll: "6", gender: "M", phone: "9876543220", status: "ACTIVE" as const },
  { id: "12", admNo: "ADM-2023-045", name: "Sanika Wagh", class: "5", section: "A", roll: "8", gender: "F", phone: "9876543221", status: "ACTIVE" as const },
]

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ACTIVE: "default",
  INACTIVE: "destructive",
  TRANSFERRED: "outline",
}

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            {sampleStudents.filter((s) => s.status === "ACTIVE").length} active students
          </p>
        </div>
        <Link
          href="/students/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Student
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, admission number, or phone..."
                className="pl-9"
              />
            </div>
            <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="">All Classes</option>
              <option>Nursery</option>
              <option>LKG</option>
              <option>UKG</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((c) => (
                <option key={c}>Class {c}</option>
              ))}
            </select>
            <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="TRANSFERRED">Transferred</option>
              <option value="">All</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Student Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">Adm. No</th>
                  <th className="pb-3 font-medium text-muted-foreground">Name</th>
                  <th className="pb-3 font-medium text-muted-foreground">Class</th>
                  <th className="pb-3 font-medium text-muted-foreground">Roll</th>
                  <th className="pb-3 font-medium text-muted-foreground">Gender</th>
                  <th className="pb-3 font-medium text-muted-foreground">Phone</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {sampleStudents.map((student) => (
                  <tr key={student.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 font-mono text-xs">{student.admNo}</td>
                    <td className="py-3 font-medium">
                      <Link
                        href={`/students/${student.id}`}
                        className="hover:underline"
                      >
                        {student.name}
                      </Link>
                    </td>
                    <td className="py-3">
                      {["Nursery", "LKG", "UKG"].includes(student.class)
                        ? student.class
                        : `Class ${student.class}`}
                      {student.section}
                    </td>
                    <td className="py-3">{student.roll}</td>
                    <td className="py-3">{student.gender}</td>
                    <td className="py-3 font-mono text-xs">{student.phone}</td>
                    <td className="py-3">
                      <Badge variant={statusVariant[student.status]}>
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Link
                        href={`/students/${student.id}/edit`}
                        className="text-sm text-primary hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
