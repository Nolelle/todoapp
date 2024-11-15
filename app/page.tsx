import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

export default function HomePage() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the API
  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    }
    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTodo = await response.json();
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div>
      <Header />
      <TodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} setTodos={setTodos} />
      <Footer />
    </div>
  );
}
