import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = auth(async (req) => {
  if (!req.auth) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("Received todo data:", body);

    if (!body.title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const userId = parseInt(req.auth.user.id);

    console.log("Creating todo for user:", userId);

    if (!userId) {
      console.error("Invalid user ID:", req.auth.user.id);
      return new NextResponse("Invalid user ID", { status: 400 });
    }

    const todo = await prisma.todo.create({
      data: {
        title: body.title,
        description: body.description || null,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        priority: body.priority || 1,
        status: "pending",
        userId: userId
      }
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error creating todo:", {
      error,
      auth: req.auth,
      userId: req.auth?.user?.id
    });

    if (error instanceof Error) {
      return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
});

export const GET = auth(async (req) => {
  if (!req.auth) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: parseInt(req.auth.user.id)
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
});
