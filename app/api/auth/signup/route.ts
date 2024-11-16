import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";
import ApiResponse from "@/utils/ApiResponse";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password, dob, gender } = await request.json();

    const db = drizzle(process.env.DATABASE_URL!);

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser.length > 0) {
      console.log(existingUser);
      return ApiResponse(false, "User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: typeof usersTable.$inferInsert = {
      name: name,
      email: email,
      password: hashedPassword,
      dob: dob,
      gender: gender,
    };

    await db.insert(usersTable).values(user);

    return ApiResponse(
      true,
      "User registered successfully. Please login to continue",
      201
    );
  } catch (error) {
    console.log("Error in signup route: ", error);

    return ApiResponse(false, "Error registering user", 500);
  }
}
