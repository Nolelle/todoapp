import { Github } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="h-16 bg-white border-t">
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          © 2024 Todo App. All rights reserved.
        </p>
        <div className="flex items-center space-x-6">
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Terms of Service
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
