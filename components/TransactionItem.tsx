"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TransactionItemProps {
  id: number;
  amount: number;
  title: string;
  date: string;
  transactionType: string;
  onDelete: (id: number) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  id,
  amount,
  title,
  date,
  transactionType,
  onDelete,
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/transactions/delete?id=${id}`);
      onDelete(id); // Notify parent component to remove this transaction from the list
    } catch {
      // console.error("Error deleting transaction:", error);
    }
  };

  const handleEdit = () => {
    router.push(`/transactions/edit/${id}`); // Navigate to the edit transaction page
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-500">
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-800">
          {new Date(date).toLocaleDateString()}
        </p>
        <p
          className={`text-sm ${
            transactionType === "expense" ? "text-red-500" : "text-green-500"
          }`}
        >
          {transactionType === "expense" ? "-" : "+"} Rs.{amount}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
