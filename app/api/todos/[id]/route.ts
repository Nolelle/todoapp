import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
        userId
      }
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const body = await request.json();
    const { title, description, dueDate, priority, status } = body;

    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: todoId,
        userId
      }
    });

    if (!existingTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        status
      }
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: todoId,
        userId
      }
    });

    if (!existingTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    await prisma.todo.delete({
      where: { id: todoId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
