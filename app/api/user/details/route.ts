import { getServerSession } from "next-auth";
import { drizzle } from "drizzle-orm/neon-http";
import { authOptions } from "../../auth/[...nextauth]/options";
import ApiResponse from "@/utils/ApiResponse";
import { usersTable } from "@/db/schema";
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

    const userDetails = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (userDetails.length === 0) {
      return ApiResponse(false, "User not found", 404);
    }

    const userData = userDetails[0];

    return ApiResponse(true, "User details fetched successfully", 201, {
      name: userData.name,
      email: userData.email,
      dob: userData.dob,
      gender: userData.gender,
    });
  } catch {
    // console.error(error);
    return ApiResponse(false, "Failed to fetch user details", 500);
  }
}
