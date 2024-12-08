import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const { title, completed } = await request.json();

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { title, completed }
    });
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Todo not found or update failed" },
      { status: 404 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    await prisma.todo.delete({ where: { id } });
    return NextResponse.json({}, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
}
