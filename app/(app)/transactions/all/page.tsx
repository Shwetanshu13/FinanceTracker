"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TransactionItem } from "@/components";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  transactionType: "income" | "expense";
  date: string;
};

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/transactions/all");
        setTransactions(response.data.messages);
      } catch {
        setError("An error occurred while fetching transactions.");
        // console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = (id: number) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Your Transactions</h2>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            id={transaction.id}
            amount={transaction.amount}
            title={transaction.title}
            date={transaction.date}
            transactionType={transaction.transactionType}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
