import { getServerSession } from "next-auth";
import { drizzle } from "drizzle-orm/neon-http";
import { authOptions } from "../../auth/[...nextauth]/options";
import ApiResponse from "@/utils/ApiResponse";
import { transactionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return ApiResponse(false, "User not authenticated", 401);
  }

  const userId = Number(user.id);

  try {
    const db = drizzle(process.env.DATABASE_URL!);

    const transactionsCount = await db.$count(
      transactionsTable,
      eq(transactionsTable.user_id, userId)
    );

    return ApiResponse(
      true,
      "Transaction count fetched successfully",
      201,
      transactionsCount
    );
  } catch (error) {
    console.error(error);
    return ApiResponse(false, "Failed to fetch transaction count", 500);
  }
}
