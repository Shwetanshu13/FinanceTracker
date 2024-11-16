import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { AuthOptions, User } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<User | null> {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            throw new Error("Missing email or password");
          }

          const db = drizzle(process.env.DATABASE_URL!);

          // Query the database to find the user by email
          const users = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, credentials.email));

          if (users.length === 0) {
            console.log("No user found");
            throw new Error("No user found with this email address");
          }

          const user = users[0];

          // Compare the hashed password with the one provided in credentials
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            console.log("Password incorrect");
            throw new Error("Password is incorrect");
          }

          // Return a sanitized user object (exclude sensitive fields like password)
          return { id: String(user.id), name: user.name, email: user.email };
        } catch (error) {
          console.error("Error in Login", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = String(token._id);
        session.user.name = token.name;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };
