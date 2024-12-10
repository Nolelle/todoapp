import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";
import { redirect } from "next/navigation";

export default async function TodosPage() {
  const session = await auth();

  // Protect the page - redirect to login if not authenticated
  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with user info and logout */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
            <p className="text-sm text-gray-600">
              Signed in as {session.user?.email}
            </p>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Main content area */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Todo list will go here */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Your todos will appear here...</p>
        </div>
      </main>
    </div>
  );
}
