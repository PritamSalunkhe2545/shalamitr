"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarCheck, ChevronRight } from "lucide-react"

const classData = [
  { name: "Nursery", section: "A", total: 22, present: 19, absent: 2, late: 1 },
  { name: "LKG", section: "A", total: 24, present: 21, absent: 2, late: 1 },
  { name: "UKG", section: "A", total: 20, present: 18, absent: 1, late: 1 },
  { name: "1", section: "A", total: 18, present: 16, absent: 2, late: 0 },
  { name: "2", section: "A", total: 21, present: 19, absent: 1, late: 1 },
  { name: "3", section: "A", total: 19, present: 15, absent: 3, late: 1 },
  { name: "4", section: "A", total: 17, present: 14, absent: 2, late: 1 },
  { name: "5", section: "A", total: 15, present: 14, absent: 1, late: 0 },
  { name: "6", section: "A", total: 12, present: 11, absent: 1, late: 0 },
  { name: "7", section: "A", total: 10, present: 8, absent: 1, late: 1 },
  { name: "8", section: "A", total: 9, present: 7, absent: 2, late: 0 },
]

const sampleStudents: Record<string, Array<{ id: string; name: string; roll: string; status: "PRESENT" | "ABSENT" | "LATE" }>> = {
  "5": [
    { id: "1", name: "Aarav Patil", roll: "1", status: "PRESENT" },
    { id: "2", name: "Sanika Wagh", roll: "2", status: "PRESENT" },
    { id: "3", name: "Rohan Kale", roll: "3", status: "ABSENT" },
    { id: "4", name: "Meera Joshi", roll: "4", status: "PRESENT" },
    { id: "5", name: "Tanvi Desai", roll: "5", status: "PRESENT" },
    { id: "6", name: "Yash Mane", roll: "6", status: "PRESENT" },
    { id: "7", name: "Pooja Pawar", roll: "7", status: "LATE" },
    { id: "8", name: "Nikhil Kadam", roll: "8", status: "PRESENT" },
    { id: "9", name: "Shruti Bhosale", roll: "9", status: "PRESENT" },
    { id: "10", name: "Aditya Sonawane", roll: "10", status: "PRESENT" },
    { id: "11", name: "Riddhi Gaikwad", roll: "11", status: "PRESENT" },
    { id: "12", name: "Aryan Jagtap", roll: "12", status: "PRESENT" },
    { id: "13", name: "Ananya Salunkhe", roll: "13", status: "PRESENT" },
    { id: "14", name: "Sahil Nikam", roll: "14", status: "PRESENT" },
    { id: "15", name: "Pallavi Thakur", roll: "15", status: "PRESENT" },
  ],
}

const statusColors: Record<string, string> = {
  PRESENT: "bg-green-500 hover:bg-green-600",
  ABSENT: "bg-red-500 hover:bg-red-600",
  LATE: "bg-yellow-500 hover:bg-yellow-600",
}

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [date] = useState(new Date().toISOString().split("T")[0])
  const students = selectedClass ? sampleStudents[selectedClass] ?? [] : []

  const displayName = (cls: string) =>
    ["Nursery", "LKG", "UKG"].includes(cls) ? cls : `Class ${cls}`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            {selectedClass ? `Marking for ${displayName(selectedClass)}A` : "Select a class to mark attendance"}
            &nbsp;&middot;&nbsp;{date}
          </p>
        </div>
        <input
          type="date"
          defaultValue={date}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        />
      </div>

      {!selectedClass ? (
        /* Class Selection Grid */
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classData.map((cls) => {
            const pct = Math.round((cls.present / cls.total) * 100)
            const marked = cls.present + cls.absent + cls.late === cls.total
            return (
              <Card
                key={cls.name}
                className="cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => setSelectedClass(cls.name)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="h-5 w-5 text-muted-foreground" />
                      <span className="font-semibold">
                        {displayName(cls.name)} {cls.section}
                      </span>
                    </div>
                    {marked ? (
                      <Badge variant="secondary" className="text-green-700">
                        Done
                      </Badge>
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span className="text-green-600 font-medium">{cls.present}P</span>
                      {" / "}
                      <span className="text-red-500">{cls.absent}A</span>
                      {cls.late > 0 && (
                        <>
                          {" / "}
                          <span className="text-yellow-600">{cls.late}L</span>
                        </>
                      )}
                    </div>
                    <span className="text-lg font-bold">{pct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        /* Attendance Grid for selected class */
        <>
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedClass(null)}
              className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              &larr; Back to Classes
            </button>
            <button className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Save Attendance
            </button>
            <div className="flex items-center gap-4 ml-auto text-sm">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                Present
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                Absent
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                Late
              </span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {displayName(selectedClass)} A &mdash; {students.length} Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              {students.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No sample students for this class. Try Class 5.
                </p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {students.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <span className="text-sm font-medium w-6 text-muted-foreground">
                        {s.roll}
                      </span>
                      <span className="flex-1 text-sm font-medium truncate">
                        {s.name}
                      </span>
                      <div className="flex gap-1">
                        {(["PRESENT", "ABSENT", "LATE"] as const).map((status) => (
                          <button
                            key={status}
                            className={`w-8 h-8 rounded-md text-xs font-bold text-white transition-colors ${
                              s.status === status
                                ? statusColors[status]
                                : "bg-muted text-muted-foreground hover:bg-muted-foreground/20"
                            }`}
                          >
                            {status[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
