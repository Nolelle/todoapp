import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
}

export function TodoItem({ todo, onDelete, onStatusChange }: TodoItemProps) {
  const priorityColors = {
    1: "bg-blue-100 text-blue-800",
    2: "bg-yellow-100 text-yellow-800",
    3: "bg-red-100 text-red-800"
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3
            className={`font-semibold ${
              todo.status === "completed" ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p className="text-gray-600 mt-1">{todo.description}</p>
          )}
          <div className="flex gap-2 mt-2">
            <span
              className={`px-2 py-1 rounded text-sm ${
                priorityColors[todo.priority as keyof typeof priorityColors]
              }`}
            >
              {["Low", "Medium", "High"][todo.priority - 1]} Priority
            </span>
            {todo.dueDate && (
              <span className="text-sm text-gray-500">
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              onStatusChange(
                todo.id,
                todo.status === "completed" ? "pending" : "completed"
              )
            }
            className="p-2 hover:bg-gray-100 rounded"
          >
            <svg
              className={`w-5 h-5 ${
                todo.status === "completed" ? "text-green-500" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 hover:bg-gray-100 rounded text-red-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
