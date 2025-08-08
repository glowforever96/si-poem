"use server";

import { db } from "@/db";
import { historyTable, userPointsTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getUserRewardInfo(userId: number) {
  const totalPoints = await db
    .select({ total: sql`SUM(${userPointsTable.points})` })
    .from(userPointsTable)
    .where(eq(userPointsTable.userId, userId))
    .then((rows) => rows[0]);

  const historyCount = await db
    .select({ count: sql`count(*)` })
    .from(historyTable)
    .where(eq(historyTable.userId, userId))
    .then((rows) => rows[0]);

  return {
    totalPoints: Number(totalPoints.total),
    historyCount: Number(historyCount.count),
  };
}
