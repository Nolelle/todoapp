import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const todoUpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.number().min(1).max(3).optional(),
  status: z.enum(["pending", "completed"]).optional()
});

// GET /api/todos/[id]
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
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

// PATCH /api/todos/[id]
export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();

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

// DELETE /api/todos/[id]
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
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
