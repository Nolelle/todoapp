import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Title is required and must be a string" },
        { status: 400 }
      );
    }
    const newTodo = await prisma.todo.create({
      data: {
        title
      }
    });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Error retrieving todos:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
