import { useState } from "react";

export default function TodoForm({ todo = {}, onAddTodo, onSubmit }) {
  const [title, setTitle] = useState(todo.title || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo ? onAddTodo(title) : onSubmit(title);
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
