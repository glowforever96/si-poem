"use server";

import { db } from "@/db";
import { historyTable } from "@/db/schema";
import { toKST } from "@/lib/time";
import { desc, eq } from "drizzle-orm";

// 사용자 오늘 히스토리 조회
export async function getUserHistory(userId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/history/${userId}`, {
    next: {
      tags: ["history"],
    },
    credentials: "include",
  });

  const history = await res.json();
  return history;
}

// 사용자 모든 히스토리 조회
export async function getAllUserHistory(userId: string) {
  const history = await db
    .select()
    .from(historyTable)
    .where(eq(historyTable.userId, parseInt(userId)))
    .orderBy(desc(historyTable.start));

  return history.map((h) => ({
    ...h,
    start: toKST(h.start),
    end: toKST(h.end),
  }));
}
