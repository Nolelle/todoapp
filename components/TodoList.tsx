import { CheckCircle, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Todo {
  id: string;
  title: string;
  completed?: boolean;
}

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoList({ todos, setTodos }: TodoListProps) {
  const deleteTodo = async (id: string) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE"
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed })
      });
      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg">
      <ul className="divide-y divide-gray-100">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-4 py-3 px-4 hover:bg-gray-50 transition-colors group"
          >
            <button
              onClick={() => toggleComplete(todo.id, todo.completed || false)}
              className="flex-shrink-0"
            >
              <CheckCircle
                className={`w-6 h-6 ${
                  todo.completed
                    ? "text-green-500 fill-current"
                    : "text-gray-300 hover:text-gray-400"
                }`}
              />
            </button>

            <span
              className={`flex-1 text-sm ${
                todo.completed ? "text-gray-500 line-through" : "text-gray-900"
              }`}
            >
              {todo.title}
            </span>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                href={`/edit/${todo.id}`}
                className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </Link>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
