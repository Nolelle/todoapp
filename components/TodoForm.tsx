"use client";

import { useState } from "react";

interface TodoFormProps {
  // 'onAddTodo' is optional, used for adding a new todo
  onAddTodo?: (title: string) => void;
  // 'onSubmit' is optional, used for editing/updating a todo
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
    if (onAddTodo) {
      onAddTodo(title);
    } else if (onSubmit) {
      onSubmit(title);
    }
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
        required
      />
      <button type="submit">{onAddTodo ? "Add Todo" : "Save"}</button>
    </form>
  );
}
