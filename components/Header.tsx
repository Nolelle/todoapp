// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 border-b">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <nav>
          <Link
            href="/"
            className="mr-4"
          >
            Home
          </Link>
          <Link href="/history">History</Link>
        </nav>
      </div>
    </header>
  );
}
