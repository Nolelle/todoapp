import { Bell, Search, User } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b px-6">
      <div className="h-full flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-px h-6 bg-gray-200"></div>
          <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
