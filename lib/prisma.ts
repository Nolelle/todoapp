import { PrismaClient } from "@prisma/client";

// Ensure the Prisma client is a singleton
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"] // Logs Prisma queries (optional)
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
