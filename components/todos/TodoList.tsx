"use client";

import { DeleteConfirmationModal } from "@/components/todos/DeleteConfirmationModalProps";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import { AddTodoForm } from "./AddTodoForm";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { TodoItem } from "./TodoItem";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    todoId: number | null;
  }>({
    isOpen: false,
    todoId: null
  });

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/todos");
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDeleteClick = (id: number) => {
    setDeleteModal({ isOpen: true, todoId: id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.todoId) return;

    try {
      const response = await fetch(`/api/todos/${deleteModal.todoId}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      setTodos(todos.filter((todo) => todo.id !== deleteModal.todoId));
      setDeleteModal({ isOpen: false, todoId: null });
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError("Failed to delete todo");
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error("Failed to update todo");
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
      );
    } catch (error) {
      setError("Failed to update todo status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner
          size="large"
          color="primary"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <ErrorMessage
          message={error}
          onRetry={fetchTodos}
          className="mb-4"
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Todos</h1>
      <AddTodoForm onAdd={fetchTodos} />
      <div className="space-y-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">
            No todos yet. Add one above!
          </p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteClick}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, todoId: null })}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
