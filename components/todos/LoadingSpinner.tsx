// components/LoadingSpinner.tsx
interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "white" | "gray";
  className?: string;
}

export function LoadingSpinner({
  size = "medium",
  color = "primary",
  className = ""
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: "h-4 w-4 border-2",
    medium: "h-6 w-6 border-2",
    large: "h-8 w-8 border-3"
  };

  const colorClasses = {
    primary: "border-blue-500 border-t-transparent",
    white: "border-white border-t-transparent",
    gray: "border-gray-300 border-t-transparent"
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${colorClasses[color]}
        rounded-full 
        animate-spin
        ${className}
      `}
      role="status"
      aria-label="Loading"
    />
  );
}
