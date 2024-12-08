import { CheckSquare, Clock, Home, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-gray-50 border-r fixed left-0 top-0">
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Todo App</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Clock className="w-5 h-5 mr-3" />
                History
              </Link>
            </li>
            <li>
              <Link
                href="/completed"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <CheckSquare className="w-5 h-5 mr-3" />
                Completed
              </Link>
            </li>
          </ul>
        </nav>

        {/* Quick Add Button */}
        <div className="p-4 border-t">
          <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusCircle className="w-5 h-5 mr-2" />
            New Task
          </button>
        </div>
      </div>
    </aside>
  );
}
