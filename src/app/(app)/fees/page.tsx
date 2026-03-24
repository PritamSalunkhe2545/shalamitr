import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, IndianRupee, AlertCircle, CheckCircle } from "lucide-react"

const classFees = [
  { name: "Nursery", total: 22, fee: 4000, collected: 78000, pending: 10000 },
  { name: "LKG", total: 24, fee: 4000, collected: 86000, pending: 10000 },
  { name: "UKG", total: 20, fee: 4500, collected: 81000, pending: 9000 },
  { name: "Class 1", total: 18, fee: 5000, collected: 80000, pending: 10000 },
  { name: "Class 2", total: 21, fee: 5000, collected: 95000, pending: 10000 },
  { name: "Class 3", total: 19, fee: 5000, collected: 85000, pending: 10000 },
  { name: "Class 4", total: 17, fee: 5500, collected: 82500, pending: 11000 },
  { name: "Class 5", total: 15, fee: 5500, collected: 71500, pending: 11000 },
  { name: "Class 6", total: 12, fee: 6000, collected: 60000, pending: 12000 },
  { name: "Class 7", total: 10, fee: 6000, collected: 48000, pending: 12000 },
  { name: "Class 8", total: 9, fee: 6500, collected: 49500, pending: 9000 },
]

const recentPayments = [
  { receipt: "RCPT-2025-0034", student: "Aarav Patil", class: "5A", amount: 5000, method: "UPI", date: "2025-03-24" },
  { receipt: "RCPT-2025-0033", student: "Sneha Kulkarni", class: "2A", amount: 3000, method: "Cash", date: "2025-03-23" },
  { receipt: "RCPT-2025-0032", student: "Diya Chavan", class: "LKG", amount: 4000, method: "UPI", date: "2025-03-22" },
  { receipt: "RCPT-2025-0031", student: "Vedant Jadhav", class: "6A", amount: 6000, method: "Cheque", date: "2025-03-21" },
  { receipt: "RCPT-2025-0030", student: "Kavya Shinde", class: "UKG", amount: 2000, method: "Cash", date: "2025-03-20" },
  { receipt: "RCPT-2025-0029", student: "Om Gaikwad", class: "1A", amount: 5000, method: "UPI", date: "2025-03-19" },
]

const pendingStudents = [
  { name: "Arjun More", class: "3A", due: 5000, phone: "9876543214" },
  { name: "Sanika Wagh", class: "5A", due: 2500, phone: "9876543221" },
  { name: "Ravi Sharma", class: "8A", due: 6500, phone: "9876543212" },
  { name: "Ananya Bhosale", class: "7A", due: 3000, phone: "9876543215" },
]

function formatINR(n: number) {
  return "\u20B9" + n.toLocaleString("en-IN")
}

export default function FeesPage() {
  const totalCollected = classFees.reduce((s, c) => s + c.collected, 0)
  const totalPending = classFees.reduce((s, c) => s + c.pending, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fees</h1>
          <p className="text-muted-foreground">Academic Year 2024-25</p>
        </div>
        <Link
          href="/fees/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Record Payment
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Collected
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{formatINR(totalCollected)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Dues
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatINR(totalPending)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Collection Rate
            </CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((totalCollected / (totalCollected + totalPending)) * 100)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Class-wise Summary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Class-wise Fee Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">Class</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">Students</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">Fee / Student</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">Collected</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">Pending</th>
                </tr>
              </thead>
              <tbody>
                {classFees.map((cls) => (
                  <tr key={cls.name} className="border-b last:border-0">
                    <td className="py-2.5 font-medium">{cls.name}</td>
                    <td className="py-2.5 text-right">{cls.total}</td>
                    <td className="py-2.5 text-right">{formatINR(cls.fee)}</td>
                    <td className="py-2.5 text-right text-green-700">{formatINR(cls.collected)}</td>
                    <td className="py-2.5 text-right text-red-600">{formatINR(cls.pending)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Pending Dues List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              Pending Dues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingStudents.map((s) => (
                <div key={s.name} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.class} &middot; {s.phone}</p>
                  </div>
                  <span className="text-sm font-semibold text-red-600">{formatINR(s.due)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Payments
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search receipts..." className="pl-9 h-8 w-64 text-xs" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 font-medium text-muted-foreground">Receipt</th>
                <th className="pb-3 font-medium text-muted-foreground">Student</th>
                <th className="pb-3 font-medium text-muted-foreground">Class</th>
                <th className="pb-3 font-medium text-muted-foreground text-right">Amount</th>
                <th className="pb-3 font-medium text-muted-foreground">Method</th>
                <th className="pb-3 font-medium text-muted-foreground">Date</th>
                <th className="pb-3 font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((p) => (
                <tr key={p.receipt} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 font-mono text-xs">{p.receipt}</td>
                  <td className="py-3 font-medium">{p.student}</td>
                  <td className="py-3">{p.class}</td>
                  <td className="py-3 text-right font-medium">{formatINR(p.amount)}</td>
                  <td className="py-3">
                    <Badge variant="outline">{p.method}</Badge>
                  </td>
                  <td className="py-3">{p.date}</td>
                  <td className="py-3">
                    <button className="text-primary text-xs hover:underline">Print</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
