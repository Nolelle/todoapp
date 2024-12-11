import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/todos/[id] - Get a specific todo
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: parseInt(params.id),
        userId: parseInt(session.user.id)
      }
    });

    if (!todo) {
      return new NextResponse("Todo not found", { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PATCH /api/todos/[id] - Update a todo
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, dueDate, priority, status } = body;

    // First verify the todo belongs to the user
    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: parseInt(params.id),
        userId: parseInt(session.user.id)
      }
    });

    if (!existingTodo) {
      return new NextResponse("Todo not found", { status: 404 });
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(params.id)
      },
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
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // First verify the todo belongs to the user
    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: parseInt(params.id),
        userId: parseInt(session.user.id)
      }
    });

    if (!existingTodo) {
      return new NextResponse("Todo not found", { status: 404 });
    }

    await prisma.todo.delete({
      where: {
        id: parseInt(params.id)
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
