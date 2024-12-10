"use client";

import LogoutButton from "@/components/LogoutButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TodoHomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to login page if not authenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Optional: Add a spinner here
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Your Todos</h1>
      <LogoutButton />
      {/* Add your Todo list components here */}
    </div>
  );
}
