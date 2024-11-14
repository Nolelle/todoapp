import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.createMany({
    data: [
      {
        title: "Complete project documentation",
        completed: false,
        createdAt: new Date("2024-01-01T10:00:00Z"),
        updatedAt: new Date("2024-01-01T10:00:00Z")
      },
      {
        title: "Set up CI/CD pipeline",
        completed: true,
        createdAt: new Date("2024-01-02T15:30:00Z"),
        updatedAt: new Date("2024-01-02T15:30:00Z")
      },
      {
        title: "Refactor API routes for efficiency",
        completed: false,
        createdAt: new Date("2024-01-03T08:45:00Z"),
        updatedAt: new Date("2024-01-03T08:45:00Z")
      },
      {
        title: "Test CRUD operations on Todos",
        completed: true,
        createdAt: new Date("2024-01-04T11:20:00Z"),
        updatedAt: new Date("2024-01-04T11:20:00Z")
      },
      {
        title: "Deploy application to Vercel",
        completed: false,
        createdAt: new Date("2024-01-05T13:10:00Z"),
        updatedAt: new Date("2024-01-05T13:10:00Z")
      }
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
