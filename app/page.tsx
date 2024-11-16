"use client";

import React from "react";
import Link from "next/link";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-blue-600">FinanceTracker</h1>
        <div>
          <Link
            href="/auth/signin"
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="ml-4 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      <main className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Take Control of Your Finances
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Easily track your income and expenses, analyze your spending patterns,
          and achieve your financial goals—all in one place.
        </p>

        <div className="flex justify-center mt-6">
          <Link
            href="/auth/signup"
            className="px-6 py-3 rounded-md bg-green-500 text-white text-lg font-medium hover:bg-green-600 transition"
          >
            Get Started for Free
          </Link>
        </div>
      </main>

      <section className="mt-16 w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Track Your Transactions
          </h3>
          <p className="text-sm text-gray-600">
            Stay on top of your income and expenses with a detailed transaction
            history.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Analyze Your Spending
          </h3>
          <p className="text-sm text-gray-600">
            Gain insights into your spending habits to make better financial
            decisions.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Achieve Your Goals
          </h3>
          <p className="text-sm text-gray-600">
            Set financial goals and track your progress to achieve them faster.
          </p>
        </div>
      </section>

      <footer className="mt-16 text-center text-gray-600 text-sm">
        © 2024 FinanceTracker. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
