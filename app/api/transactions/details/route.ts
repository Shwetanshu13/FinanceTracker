import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ApiResponse from "@/utils/ApiResponse";
import { transactionsTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, and } from "drizzle-orm";

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

  const userId = Number(user.id);
  const { searchParams } = new URL(request.url);
  const transactionId = Number(searchParams.get("id"));

  if (!transactionId) {
    return ApiResponse(false, "Transaction ID is required", 400);
  }

  try {
    const db = drizzle(process.env.DATABASE_URL!);

    const transaction = await db
      .select()
      .from(transactionsTable)
      .where(
        and(
          eq(transactionsTable.id, transactionId),
          eq(transactionsTable.user_id, userId)
        )
      )
      .limit(1);

    if (!transaction.length) {
      return ApiResponse(false, "Transaction not found", 404);
    }

    return Response.json(
      {
        success: true,
        transaction: transaction[0],
      },
      { status: 200 }
    );
  } catch {
    // console.error(error);
    return ApiResponse(
      false,
      "An error occurred while fetching the transaction",
      500
    );
  }
}
