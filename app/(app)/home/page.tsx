"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch income and expenses
        const incomeExpenseResponse = await axios.get(
          "/api/transactions/totalIncomeAndExpenses"
        );
        const { totalIncome, totalExpenses } = incomeExpenseResponse.data?.data;

        setTotalIncome(totalIncome);
        setTotalExpenses(totalExpenses);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-lg font-semibold text-gray-800">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Financial Overview
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center bg-green-100 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">Total Balance</p>
            <p className="text-xl font-bold text-green-600">
              ₹{totalIncome - totalExpenses}
            </p>
          </div>
          <div className="flex flex-col items-center bg-blue-100 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">Total Income</p>
            <p className="text-xl font-bold text-blue-600">₹{totalIncome}</p>
          </div>
          <div className="flex flex-col items-center bg-red-100 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">Total Expense</p>
            <p className="text-xl font-bold text-red-600">₹{totalExpenses}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
