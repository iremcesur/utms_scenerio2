// @ts-check
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fixed demo application ID — stable across deploys so the student dashboard
// always has a real application to work with immediately after deployment.
const DEMO_APP_ID = "a0000000-0000-0000-0000-000000000001";

async function main() {
  await prisma.application.upsert({
    where: { applicationId: DEMO_APP_ID },
    update: {},
    create: {
      applicationId: DEMO_APP_ID,
      studentId: "student-ahmet-yilmaz",
      studentTckn: "12345678901",
      studentFullName: "Ahmet Yilmaz",
      periodId: "period-spring-2026",
      targetDepartmentId: "dept-computer-engineering",
      targetFacultyId: "faculty-engineering",
      transferType: "HORIZONTAL",
      targetedSemester: 3,
      submittedGpa: 3.45,
      submittedYksScore: 485.5,
      currentStatus: "PENDING_DOCUMENT_UPLOAD",
    },
  });
  console.log("Seeded demo application:", DEMO_APP_ID);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
