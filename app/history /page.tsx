// app/history/page.tsx
"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

interface TodoHistory {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function HistoryPage() {
  const [todoHistory, setTodoHistory] = useState<TodoHistory[]>([]);
  const [sortBy, setSortBy] = useState<"createdAt" | "updatedAt">("createdAt");
  const [filterCompleted, setFilterCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchTodoHistory() {
      const response = await fetch("/api/todos/history");
      const data = await response.json();
      setTodoHistory(data);
    }
    fetchTodoHistory();
  }, []);

  const getSortedAndFilteredTodos = () => {
    let filtered = [...todoHistory];

    // Apply completion filter if set
    if (filterCompleted !== null) {
      filtered = filtered.filter((todo) => todo.completed === filterCompleted);
    }

    // Sort by selected criteria
    return filtered.sort((a, b) => {
      const dateA = new Date(a[sortBy]).getTime();
      const dateB = new Date(b[sortBy]).getTime();
      return dateB - dateA;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 font-geist-sans">
            Todo History
          </h2>

          <div className="mb-6 flex gap-4">
            <select
              className="p-2 border rounded"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "createdAt" | "updatedAt")
              }
            >
              <option value="createdAt">Sort by Created Date</option>
              <option value="updatedAt">Sort by Last Modified</option>
            </select>

            <select
              className="p-2 border rounded"
              value={
                filterCompleted === null ? "all" : filterCompleted.toString()
              }
              onChange={(e) => {
                const value = e.target.value;
                setFilterCompleted(value === "all" ? null : value === "true");
              }}
            >
              <option value="all">All Todos</option>
              <option value="true">Completed</option>
              <option value="false">Pending</option>
            </select>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Last Modified
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getSortedAndFilteredTodos().map((todo) => (
                  <tr key={todo.id}>
                    <td className="px-6 py-4">{todo.title}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          todo.completed
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {todo.completed ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(todo.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(todo.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
