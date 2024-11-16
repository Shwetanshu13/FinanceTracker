"use client";

import { EditTransaction } from "@/components";
import { useParams } from "next/navigation";
import React from "react";

const EditTransactionPage = () => {
  const params = useParams<{ transactionId: string }>();
  const transactionId = decodeURIComponent(params.transactionId);

  // // console.log(transactionId);

  return (
    <div className="my-16">
      <EditTransaction params={{ id: transactionId }} />
    </div>
  );
};

export default EditTransactionPage;
