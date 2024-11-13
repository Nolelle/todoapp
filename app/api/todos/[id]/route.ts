import { NextRequest, NextResponse } from "next/server";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const todos: Todo[] = [];

export async function Put(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, completed } = await request.json();

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return NextResponse.json(
      { error: `Todo with id ${id} not found` },
      { status: 404 }
    );
  }

  todos[todoIndex] = { ...todos[todoIndex], title, completed };

  return NextResponse.json(todos[todoIndex], { status: 200 });
}

export async function Delete(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return NextResponse.json(
      { error: `Todo with id ${id} not found` },
      { status: 404 }
    );
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];

  return NextResponse.json(deletedTodo, { status: 200 });
}
