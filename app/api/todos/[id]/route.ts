import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for todo updates
const todoUpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.number().min(1).max(3).optional(),
  status: z.enum(["pending", "completed"]).optional()
});

// The correct type for route context
type RouteContext = {
  params: {
    id: string;
  };
};

// GET /api/todos/[id] - Get a specific todo
export async function GET(request: NextRequest, context: RouteContext) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: parseInt(context.params.id),
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
export async function PATCH(request: NextRequest, context: RouteContext) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();

    const validationResult = todoUpdateSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { errors: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { title, description, dueDate, priority, status } =
      validationResult.data;

    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: parseInt(context.params.id),
        userId: parseInt(session.user.id)
      }
    });

    if (!existingTodo) {
      return new NextResponse("Todo not found", { status: 404 });
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(context.params.id)
      },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(priority && { priority }),
        ...(status && { status })
      }
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(request: NextRequest, context: RouteContext) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: parseInt(context.params.id),
        userId: parseInt(session.user.id)
      }
    });

    if (!existingTodo) {
      return new NextResponse("Todo not found", { status: 404 });
    }

    await prisma.todo.delete({
      where: {
        id: parseInt(context.params.id)
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
