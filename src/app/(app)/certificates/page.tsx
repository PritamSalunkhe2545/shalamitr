"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Download, Search } from "lucide-react"

const issuedCertificates = [
  { serial: "BON-2025-0012", type: "BONAFIDE", student: "Aarav Patil", class: "5A", issued: "2025-03-20" },
  { serial: "LVG-2025-0003", type: "LEAVING", student: "Ishaan Pawar", class: "4A", issued: "2025-03-15" },
  { serial: "BON-2025-0011", type: "BONAFIDE", student: "Priya Deshmukh", class: "Nursery A", issued: "2025-03-10" },
  { serial: "BON-2025-0010", type: "BONAFIDE", student: "Sneha Kulkarni", class: "2A", issued: "2025-03-08" },
  { serial: "BON-2025-0009", type: "BONAFIDE", student: "Arjun More", class: "3A", issued: "2025-02-28" },
  { serial: "LVG-2025-0002", type: "LEAVING", student: "Meena Gawde", class: "8A", issued: "2025-02-15" },
  { serial: "BON-2025-0008", type: "BONAFIDE", student: "Vedant Jadhav", class: "6A", issued: "2025-02-10" },
  { serial: "BON-2025-0007", type: "BONAFIDE", student: "Ananya Bhosale", class: "7A", issued: "2025-01-20" },
]

const typeBadge: Record<string, "default" | "destructive"> = {
  BONAFIDE: "default",
  LEAVING: "destructive",
}

export default function CertificatesPage() {
  const [certType, setCertType] = useState<"BONAFIDE" | "LEAVING">("BONAFIDE")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Certificates</h1>
        <p className="text-muted-foreground">Generate and manage bonafide &amp; leaving certificates</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Issued
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">This academic year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bonafide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Leaving
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Generate Certificate Form */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Certificate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Certificate Type</Label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCertType("BONAFIDE")}
                  className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    certType === "BONAFIDE"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-accent"
                  }`}
                >
                  Bonafide
                </button>
                <button
                  onClick={() => setCertType("LEAVING")}
                  className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    certType === "LEAVING"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-accent"
                  }`}
                >
                  Leaving
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-search">Search Student</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="student-search" placeholder="Name or admission number" className="pl-9" />
              </div>
            </div>

            {/* Sample student selection */}
            <div className="rounded-md border p-3 space-y-1">
              <p className="text-sm font-medium">Aarav Patil</p>
              <p className="text-xs text-muted-foreground">
                ADM-2024-001 &middot; Class 5A &middot; Roll 1
              </p>
            </div>

            {certType === "LEAVING" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="leaving-date">Leaving Date</Label>
                  <Input id="leaving-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leaving-reason">Reason</Label>
                  <Input id="leaving-reason" placeholder="e.g. Family relocation" />
                </div>
              </>
            )}

            <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Generate {certType === "BONAFIDE" ? "Bonafide" : "Leaving"} Certificate
            </button>
          </CardContent>
        </Card>

        {/* Issued Certificates Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Issued Certificates
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9 h-8 w-56 text-xs" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">Serial</th>
                  <th className="pb-3 font-medium text-muted-foreground">Type</th>
                  <th className="pb-3 font-medium text-muted-foreground">Student</th>
                  <th className="pb-3 font-medium text-muted-foreground">Class</th>
                  <th className="pb-3 font-medium text-muted-foreground">Issued</th>
                  <th className="pb-3 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {issuedCertificates.map((cert) => (
                  <tr key={cert.serial} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 font-mono text-xs">{cert.serial}</td>
                    <td className="py-3">
                      <Badge variant={typeBadge[cert.type]}>
                        {cert.type}
                      </Badge>
                    </td>
                    <td className="py-3 font-medium">{cert.student}</td>
                    <td className="py-3">{cert.class}</td>
                    <td className="py-3">{cert.issued}</td>
                    <td className="py-3">
                      <button className="inline-flex items-center gap-1 text-primary text-xs hover:underline">
                        <Download className="h-3 w-3" />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
