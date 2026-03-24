import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function NewStudentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Student</h1>
        <p className="text-muted-foreground">Register a new student</p>
      </div>

      <form className="space-y-6">
        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" placeholder="Enter first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" placeholder="Enter last name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input id="dob" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <select id="gender" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Academic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="admNo">Admission Number *</Label>
              <Input id="admNo" placeholder="e.g. ADM-2024-001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rollNo">Roll Number *</Label>
              <Input id="rollNo" placeholder="Enter roll number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class *</Label>
              <select id="class" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Select class</option>
                <option>Nursery</option>
                <option>LKG</option>
                <option>UKG</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((c) => (
                  <option key={c} value={c}>
                    Class {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <select id="section" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admDate">Admission Date</Label>
              <Input id="admDate" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
            </div>
          </CardContent>
        </Card>

        {/* Guardian Info */}
        <Card>
          <CardHeader>
            <CardTitle>Parent / Guardian Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fatherName">Father&apos;s Name *</Label>
              <Input id="fatherName" placeholder="Enter father's name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherName">Mother&apos;s Name *</Label>
              <Input id="motherName" placeholder="Enter mother's name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Guardian Phone *</Label>
              <Input id="phone" type="tel" placeholder="10-digit mobile number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="altPhone">Alternate Phone</Label>
              <Input id="altPhone" type="tel" placeholder="Optional" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Guardian Email</Label>
              <Input id="email" type="email" placeholder="Optional" />
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address *</Label>
              <Input id="address" placeholder="Street address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue="Dondaicha" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" defaultValue="Maharashtra" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" placeholder="6-digit pincode" />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Save Student
          </button>
          <Link
            href="/students"
            className="inline-flex items-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
