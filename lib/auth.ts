import { hash } from "bcryptjs";
import { prisma } from "./prisma"; // Adjust the path to match your project structure

/**
 * Create a new user with a hashed password
 * @param email - User's email
 * @param password - User's raw password
 * @returns Newly created user record
 */
export async function createUser(email: string, password: string) {
  const hashedPassword = await hash(password, 10); // Hash password with a salt of 10
  const user = await prisma.user.create({
    data: { email, password: hashedPassword }
  });
  return user;
}
