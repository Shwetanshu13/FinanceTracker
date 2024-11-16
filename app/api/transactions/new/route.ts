import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ApiResponse from "@/utils/ApiResponse";
import { transactionsTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";

export async function POST(request: NextRequest) {
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
  const { amount, date, title, transactionType } = body;

  if (!amount || !date || !title || !transactionType) {
    return ApiResponse(false, "All fields are required", 400);
  }

  try {
    const db = drizzle(process.env.DATABASE_URL!);

    await db.insert(transactionsTable).values({
      user_id: userId,
      amount,
      date: new Date(date),
      title,
      transactionType,
    });

    return ApiResponse(true, "Transaction created successfully", 201);
  } catch {
    // console.log(error);
    return ApiResponse(
      false,
      "An error occurred while creating the transaction",
      500
    );
  }
}
