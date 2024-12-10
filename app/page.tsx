import LoginForm from "@/components/LoginForm";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to TodoApp
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Please log in to manage your todos.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
