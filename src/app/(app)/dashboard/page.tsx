import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, CalendarCheck, IndianRupee, FileText } from "lucide-react"

const stats = [
  {
    title: "Total Students",
    value: "187",
    change: "+12 this year",
    icon: Users,
  },
  {
    title: "Present Today",
    value: "162",
    change: "86.6% attendance",
    icon: CalendarCheck,
  },
  {
    title: "Pending Dues",
    value: "\u20B932,500",
    change: "14 students",
    icon: IndianRupee,
  },
  {
    title: "Certificates Issued",
    value: "24",
    change: "This academic year",
    icon: FileText,
  },
]

const recentActivity = [
  {
    action: "Fee Payment",
    detail: "Aarav Patil (Class 5A) paid \u20B95,000",
    time: "10 min ago",
    badge: "payment",
  },
  {
    action: "New Student",
    detail: "Priya Deshmukh enrolled in Nursery",
    time: "1 hour ago",
    badge: "student",
  },
  {
    action: "Attendance Marked",
    detail: "Class 3A \u2014 28/30 present",
    time: "2 hours ago",
    badge: "attendance",
  },
  {
    action: "Certificate Generated",
    detail: "Bonafide for Ravi Sharma (Class 8)",
    time: "Yesterday",
    badge: "certificate",
  },
  {
    action: "Fee Payment",
    detail: "Sneha Kulkarni (Class 2A) paid \u20B93,000",
    time: "Yesterday",
    badge: "payment",
  },
]

const classSummary = [
  { name: "Nursery", total: 22, present: 19 },
  { name: "LKG", total: 24, present: 21 },
  { name: "UKG", total: 20, present: 18 },
  { name: "Class 1", total: 18, present: 16 },
  { name: "Class 2", total: 21, present: 19 },
  { name: "Class 3", total: 19, present: 15 },
  { name: "Class 4", total: 17, present: 14 },
  { name: "Class 5", total: 15, present: 14 },
  { name: "Class 6", total: 12, present: 11 },
  { name: "Class 7", total: 10, present: 8 },
  { name: "Class 8", total: 9, present: 7 },
]

const badgeVariant: Record<string, "default" | "secondary" | "outline"> = {
  payment: "default",
  student: "secondary",
  attendance: "outline",
  certificate: "secondary",
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Jijau English School management system
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{item.action}</p>
                      <Badge variant={badgeVariant[item.badge] ?? "outline"} className="text-[10px] px-1.5 py-0">
                        {item.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {item.detail}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Class-wise Attendance Today */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Attendance by Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {classSummary.map((cls) => {
                const pct = Math.round((cls.present / cls.total) * 100)
                return (
                  <div key={cls.name} className="flex items-center gap-3">
                    <span className="text-sm w-16 shrink-0">{cls.name}</span>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-20 text-right">
                      {cls.present}/{cls.total} ({pct}%)
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
