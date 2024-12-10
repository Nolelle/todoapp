import { prisma } from "@/lib/prisma"; // Import your Prisma client
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs"; // For secure password comparison
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
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

        // Fetch user from database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        // Verify password
        const isValidPassword = await compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        // Return user details (this will be available in the session)
        return { id: user.id, email: user.email, name: user.name };
      }
    })
  ],
  adapter: PrismaAdapter(prisma), // Prisma adapter for NextAuth
  secret: process.env.NEXTAUTH_SECRET, // Make sure this is set in your .env file
  session: {
    strategy: "jwt" // Use JWT for stateless sessions
  },
  callbacks: {
    async session({ session, token }) {
      // Include user ID in the session
      if (token?.id) {
        session.user = { ...session.user, id: token.id };
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add user ID to JWT token
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: "/auth/signin", // Customize your sign-in page
    error: "/auth/error" // Customize your error page
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
