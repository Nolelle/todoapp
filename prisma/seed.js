import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing todos (optional for development)
  await prisma.todo.deleteMany();

  // Clear existing users (optional for development)
  await prisma.user.deleteMany();

  // Retrieve the seed user password from the .env file
  const rawPassword = process.env.SEED_USER_PASSWORD || "defaultpassword";

  // Hash the password before saving to the database
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  // Create a user
  const user = await prisma.user.create({
    data: {
      email: "testuser@example.com",
      password: hashedPassword, // Store the hashed password
      name: "Test User"
    }
  });

  console.log("Created user:", user);

  // Create some todos for the user
  const todos = [
    {
      title: "Buy groceries",
      description: "Milk, Bread, Eggs",
      priority: 2,
      status: "pending",
      dueDate: new Date("2024-12-15"),
      userId: user.id
    },
    {
      title: "Read a book",
      description: "Complete 50 pages of the current book.",
      priority: 1,
      status: "completed",
      dueDate: new Date("2024-12-10"),
      userId: user.id
    },
    {
      title: "Workout",
      description: "1-hour session at the gym.",
      priority: 3,
      status: "pending",
      dueDate: new Date("2024-12-12"),
      userId: user.id
    }
  ];

  for (const todo of todos) {
    const createdTodo = await prisma.todo.create({ data: todo });
    console.log("Created todo:", createdTodo);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
