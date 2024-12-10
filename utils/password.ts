import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

// Use this function when creating a new user
export async function createUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password);

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  });
}
