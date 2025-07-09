import { PrismaClient } from "@prisma/client";

import { env } from "~/env";

const createPrismaClient = () => {
  try {
    // Check if we're in demo mode or if DATABASE_URL is not available
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
    const hasDatabase = env.DATABASE_URL && env.DATABASE_URL !== "";
    
    if (isDemoMode || !hasDatabase) {
      console.log("🎭 Demo mode enabled or no database URL - skipping Prisma client creation");
      return null;
    }
    
    return new PrismaClient({
      log:
        env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  } catch (error) {
    console.warn("⚠️ Failed to create Prisma client:", error);
    // Return null for demo mode
    return null;
  }
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
