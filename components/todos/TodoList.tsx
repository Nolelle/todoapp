"use client";

import { DeleteConfirmationModal } from "@/components/todos/DeleteConfirmationModalProps";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import { AddTodoButton } from "./AddTodoButton";
import { AddTodoForm } from "./AddTodoForm";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { TodoItem } from "./TodoItem";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
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
      console.error("Error loading todos:", error);
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
      console.error("Error updating todo status:", error);
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
    <div className="relative min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4">
        {/* Todo List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">
              No todos yet. Click the button below to add one!
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

        {/* Add Todo Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Add New Todo</h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close form"
                  >
                    <svg
                      className="w-6 h-6 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <AddTodoForm
                  onAdd={() => {
                    fetchTodos();
                    setShowAddForm(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Floating Add Button */}
        <AddTodoButton
          showForm={showAddForm}
          onClick={() => setShowAddForm(!showAddForm)}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, todoId: null })}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
}
