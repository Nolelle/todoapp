// auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { prisma } from "./lib/prisma";
import { signInSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/"
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        try {
          // Validate credentials using Zod schema
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // Find user by email using Prisma
          const user = await prisma.user.findUnique({
            where: {
              email: email
            },
            select: {
              id: true,
              email: true,
              name: true,
              password: true
            }
          });

          if (!user?.password) {
            throw new Error("Invalid credentials.");
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
          }

          // Return user data (excluding password)
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name
          };
        } catch (error) {
          // Handle Zod validation errors
          if (error instanceof ZodError) {
            console.error("Validation error:", error.errors);
            return null;
          }

          // Handle other errors
          if (error instanceof Error) {
            console.error("Authentication error:", error.message);
          }
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string
        }
      };
    }
  }
});
