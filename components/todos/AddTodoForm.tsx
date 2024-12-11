"use client";

import { ErrorMessage } from "@/components/todos/ErrorMessage";
import { LoadingSpinner } from "@/components/todos/LoadingSpinner";
import { useRef, useState } from "react";

interface AddTodoFormProps {
  onAdd: () => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      priority: parseInt(formData.get("priority") as string),
      dueDate: formData.get("dueDate"),
      status: "pending"
    };

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      onAdd();
      form.reset();
      setError(null);
    } catch (error) {
      console.error("Error creating todo:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create todo. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => setError(null)}
        />
      )}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Todo title"
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            disabled={isSubmitting}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            rows={3}
          />
          <div className="flex gap-4">
            <select
              name="priority"
              defaultValue="1"
              disabled={isSubmitting}
              className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="1">Low Priority</option>
              <option value="2">Medium Priority</option>
              <option value="3">High Priority</option>
            </select>
            <input
              type="date"
              name="dueDate"
              disabled={isSubmitting}
              className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner
                    color="white"
                    size="small"
                  />
                  <span>Adding...</span>
                </div>
              ) : (
                "Add Todo"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
