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
  { params }: { params: { id: string } }
): Promise<NextResponse> {
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

// PATCH /api/todos/[id]
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const parsedBody = todoUpdateSchema.parse(body);

    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(params.id),
        userId: parseInt(session.user.id)
      },
      data: parsedBody
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
