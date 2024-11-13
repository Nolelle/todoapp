import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { title } = await request.json();
  const newTodo = await prisma.todo.create({
    data: {
      title
    }
  });

  return NextResponse.json(newTodo, { status: 201 });
}
