import { auth } from "@/auth";
import SignIn from "@/components/Login/SignIn";
import { redirect } from "next/navigation";

export default async function HomePage() {
  // Check if user is already authenticated
  const session = await auth();

  // If authenticated, redirect to todos page
  if (session) {
    redirect("/todo");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to TodoApp
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please sign in to manage your todos
        </p>
        <SignIn />
      </div>
    </div>
  );
}
