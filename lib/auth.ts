import { hash } from "bcryptjs";
import { prisma } from "./prisma"; // Adjust the path to match your project structure

/**
 * Create a new user with a hashed password
 * @param email - User's email
 * @param password - User's raw password
 * @param name - User's name (optional)
 * @returns Newly created user record
 */
export async function createUser(
  email: string,
  password: string,
  name?: string
) {
  const hashedPassword = await hash(password, 10); // Hash password with a salt of 10

  // Construct the data object conditionally
  const data: { email: string; password: string; name?: string } = {
    email,
    password: hashedPassword
  };

  if (name) {
    data.name = name; // Include name only if it's defined
  }

  const user = await prisma.user.create({ data });
  return user;
}
