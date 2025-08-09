"use server";
import { auth } from "@/auth";
import { db } from "@/db";
import { userPointsTable } from "@/db/schema";
import { toKST } from "@/lib/time";
import { desc, eq } from "drizzle-orm";

export async function getUserPointHistory() {
  const session = await auth();
  const userId = Number(session?.user.id);

  const pointHistory = await db
    .select()
    .from(userPointsTable)
    .where(eq(userPointsTable.userId, userId))
    .orderBy(desc(userPointsTable.createdAt));
  return pointHistory.map((item) => ({
    ...item,
    createdAt: toKST(item.createdAt),
  }));
}
