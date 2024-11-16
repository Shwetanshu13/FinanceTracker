"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo or Brand Name */}
          <div className="text-2xl font-semibold text-gray-800">
            <Link href="/">My Finance App</Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/home"
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/transactions/all"
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              Transactions
            </Link>
            <Link
              href="/transactions/add-new/"
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              Add Transaction
            </Link>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="text-gray-800 hover:text-blue-600 flex items-center"
              >
                <span className="mr-2">User</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200">
                  <ul className="space-y-1 py-2">
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-gray-800 text-left hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
