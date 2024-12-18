interface ErrorMessageProps {
  message: string;
  className?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  message,
  className = "",
  onRetry
}: ErrorMessageProps) {
  return (
    <div className={`rounded-lg bg-red-50 p-4 ${className}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
        {onRetry && (
          <div className="ml-auto pl-3">
            <button
              onClick={onRetry}
              className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 
                       focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
