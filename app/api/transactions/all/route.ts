import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import ApiResponse from "@/utils/ApiResponse";
import { transactionsTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  // // console.log(user);

  if (!session || !user) {
    return ApiResponse(
      false,
      "You need to be logged in to view this page",
      401
    );
  }

  const userId = user.id;
  // // console.log(userId);

  if (!userId) {
    return ApiResponse(
      false,
      "You need to be logged in to view this page",
      401
    );
  }

  const userIdNumber = Number(userId);

  try {
    const db = drizzle(process.env.DATABASE_URL!);

    const transactions = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.user_id, userIdNumber));

    return Response.json(
      {
        success: true,
        messages: transactions,
      },
      {
        status: 200,
      }
    );
  } catch {
    // console.log(error);
    return ApiResponse(false, "An error occured while fetching recipies", 500);
  }
}
