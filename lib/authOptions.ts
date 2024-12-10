import { prisma } from "@/lib/prisma"; // Adjust the path to match your structure
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs"; // For password comparison
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Find the user in the database by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        // Check if the user exists and their password is correct
        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        // Return the user object with the `id` as a string
        return {
          id: String(user.id), // Convert `id` to string for compatibility with NextAuth
          email: user.email,
          name: user.name || "Anonymous"
        };
      }
    })
  ],
  session: {
    strategy: "jwt" // Use JSON Web Tokens for session management
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      // Add `id` to the session user object
      if (token?.id) {
        session.user = {
          ...session.user,
          id: token.id as string // Explicitly type token.id as string
        };
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User & { id: string } }) {
      // Add `id` to the token
      if (user) {
        token.id = user.id; // Persist the user's ID in the token
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET // Ensure this is set in your `.env` file
};
