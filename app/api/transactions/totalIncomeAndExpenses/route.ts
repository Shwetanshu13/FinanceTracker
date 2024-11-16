import { NextRequest } from "next/server";
import { drizzle } from "drizzle-orm/neon-http";
import { transactionsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import ApiResponse from "@/utils/ApiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return ApiResponse(
      false,
      "You need to be logged in to view this page",
      401
    );
  }

  try {
    const db = drizzle(process.env.DATABASE_URL!);

    // Calculate total income
    const incomeTransactions = await db
      .select()
      .from(transactionsTable)
      .where(
        and(
          eq(transactionsTable.user_id, Number(user.id)),
          eq(transactionsTable.transactionType, "income")
        )
      );

    const totalIncome = incomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Calculate total expenses
    const expenseTransactions = await db
      .select()
      .from(transactionsTable)
      .where(
        and(
          eq(transactionsTable.user_id, Number(user.id)),
          eq(transactionsTable.transactionType, "expense")
        )
      );

    const totalExpenses = expenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Return both totalIncome and totalExpenses
    return ApiResponse(true, "Total Income and Expenses", 200, {
      totalIncome,
      totalExpenses,
    });
  } catch (error) {
    console.error("Error calculating total income and expenses:", error);
    return ApiResponse(false, "An error occurred", 500);
  }
}
