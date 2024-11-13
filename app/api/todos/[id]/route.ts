import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, completed } = await request.json();

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: {
      title,
      completed
    }
  });

  return NextResponse.json(updatedTodo, { status: 200 });
}

export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params;

  const deletedTodo = await prisma.todo.delete({ where: { id } });

  return NextResponse.json(deletedTodo, { status: 200 });
}
