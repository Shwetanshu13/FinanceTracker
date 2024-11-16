import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ApiResponse from "@/utils/ApiResponse";
import { transactionsTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";

export async function DELETE(request: NextRequest) {
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
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return ApiResponse(false, "Transaction ID is required", 400);
  }

  try {
    const db = drizzle(process.env.DATABASE_URL!);

    const result = await db
      .delete(transactionsTable)
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

    return ApiResponse(true, "Transaction deleted successfully", 200);
  } catch (error) {
    console.log(error);
    return ApiResponse(
      false,
      "An error occurred while deleting the transaction",
      500
    );
  }
}
