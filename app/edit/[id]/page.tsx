"use client";
import TodoForm from "@/components/TodoForm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTodoPage() {
  const router = useRouter();
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    async function fetchTodo() {
      const response = await fetch(`/api/todos/${id}`);
      const data = await response.json();
      setTodo(data);
    }
    if (id) fetchTodo();
  }, [id]);

  const updateTodo = async (title: string) => {
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    router.push("/");
  };

  return todo ? (
    <TodoForm
      todo={todo}
      onSubmit={updateTodo}
    />
  ) : (
    <p>Loading...</p>
  );
}
