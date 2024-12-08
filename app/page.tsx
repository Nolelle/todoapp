"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

interface Todo {
  id: string;
  title: string;
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos from the API
  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch("/api/todos");
      const data: Todo[] = await response.json();
      setTodos(data);
    }
    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    const newTodo: Todo = await response.json();
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
      />
      <Footer />
    </div>
  );
}
