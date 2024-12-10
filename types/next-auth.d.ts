declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Include the user's ID
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string; // Extend the user object to include `id`
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Include `id` in the JWT token
  }
}
