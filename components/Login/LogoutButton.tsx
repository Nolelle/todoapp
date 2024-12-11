import { signOut } from "@/auth";

export default function LogoutButton() {
  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <form action={handleSignOut}>
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 
                   transition-colors flex items-center gap-2"
      >
        Sign Out
      </button>
    </form>
  );
}
