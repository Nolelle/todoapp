// components/todos/AddTodoButton.tsx
interface AddTodoButtonProps {
  showForm: boolean;
  onClick: () => void;
}

export function AddTodoButton({ showForm, onClick }: AddTodoButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 flex items-center gap-2 bg-blue-500 text-white 
                px-4 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
    >
      {showForm ? (
        <>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span>Close</span>
        </>
      ) : (
        <>
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add Todo</span>
        </>
      )}
    </button>
  );
}
