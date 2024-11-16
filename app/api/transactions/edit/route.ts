import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ApiResponse from "@/utils/ApiResponse";
import { transactionsTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return ApiResponse(
      false,
      "You need to be logged in to perform this action",
      401
    );
  }

  const userId = Number(user.id);
  const body = await request.json();
  const { id, amount, date, title, transactionType } = body;

  if (!id || !amount || !date || !title || !transactionType) {
    return ApiResponse(false, "All fields are required", 400);
  }

  try {
    const db = drizzle(process.env.DATABASE_URL!);

    const result = await db
      .update(transactionsTable)
      .set({
        amount,
        date: new Date(date),
        title,
        transactionType,
      })
      .where(
        and(eq(transactionsTable.id, id), eq(transactionsTable.user_id, userId))
      );

    if (!result) {
      return ApiResponse(
        false,
        "Transaction not found or not owned by user",
        404
      );
    }

    return ApiResponse(true, "Transaction updated successfully", 200);
  } catch {
    // console.log(error);
    return ApiResponse(
      false,
      "An error occurred while updating the transaction",
      500
    );
  }
}
