import { prisma } from "@/lib/prisma"; // Adjust the path to match your structure
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs"; // For password comparison
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
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

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

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

        // Return the user object with the id as a string
        return {
          id: String(user.id), // Convert ID to string
          email: user.email,
          name: user.name || "Anonymous"
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.id) {
        session.user = {
          ...session.user,
          id: token.id
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Persist the user's ID in the token
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};
