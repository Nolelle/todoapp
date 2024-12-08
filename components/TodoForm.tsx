import { Plus, Save } from "lucide-react";
import React, { useState } from "react";

interface TodoFormProps {
  onAddTodo?: (title: string) => void;
  onSubmit?: (title: string) => Promise<void>;
  todo?: { title?: string };
}

export default function TodoForm({
  todo = {},
  onAddTodo,
  onSubmit
}: TodoFormProps) {
  const [title, setTitle] = useState<string>(todo.title || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      if (onAddTodo) {
        onAddTodo(title);
      } else if (onSubmit) {
        onSubmit(title);
      }
      setTitle("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          {onAddTodo ? (
            <>
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
