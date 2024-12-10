// types/next-auth.d.ts
import { signInSchema } from "@/lib/zod";
import type { DefaultSession } from "next-auth";
import type { z } from "zod";

declare module "next-auth" {
  // Define the User type
  interface User {
    id: number;
    email: string;
    name?: string | null;
  }

  // Define the Session type
  interface Session {
    user: {
      id: number;
    } & DefaultSession["user"];
  }
}

// Define the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    email: string;
    name?: string | null;
  }
}

// Export the SignIn type from the Zod schema
export type SignInCredentials = z.infer<typeof signInSchema>;
