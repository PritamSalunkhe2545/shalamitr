import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const classes = [
  "Nursery", "LKG", "UKG",
  "1", "2", "3", "4", "5", "6", "7", "8",
]

async function main() {
  console.log("Seeding fee structures...")
  for (const className of classes) {
    await prisma.feeStructure.upsert({
      where: { className_academicYear: { className, academicYear: "2024-25" } },
      update: {},
      create: {
        className,
        academicYear: "2024-25",
        totalAmount: 5000, // Replace with actual fee amounts per class
      },
    })
  }

  console.log("Seeding test student...")
  await prisma.student.upsert({
    where: { admissionNumber: "TEST-001" },
    update: {},
    create: {
      firstName: "Test",
      lastName: "Student",
      dateOfBirth: new Date("2015-06-15"),
      gender: "MALE",
      rollNumber: "1",
      className: "5",
      section: "A",
      admissionNumber: "TEST-001",
      address: "Test Address, Dondaicha",
      city: "Dondaicha",
      state: "Maharashtra",
      fatherName: "Test Father",
      motherName: "Test Mother",
      guardianPhone: "9876543210",
    },
  })

  console.log("Seeding complete.")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
