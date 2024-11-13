import { NextRequest, NextResponse } from "next/server";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

// Temporary Storage
const todos: Todo[] = [];

export async function POST(request: NextRequest) {
  const { title } = await request.json();

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false
  };

  todos.push(newTodo);

  return NextResponse.json(newTodo, { status: 201 });
}

export async function GET() {
  return NextResponse.json(todos, { status: 200 });
}
