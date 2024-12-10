const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      email: "testuser@example.com",
      password: "securepassword", // Replace with hashed password in real use
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
