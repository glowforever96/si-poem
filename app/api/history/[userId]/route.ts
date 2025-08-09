import { db } from "@/db";
import { historyTable } from "@/db/schema";
import { and, desc, eq, gte, lt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  const now = new Date();

  const startOfTodayKST = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const endOfTodayKST = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );

  const startOfTodayUTC = new Date(
    startOfTodayKST.getTime() - 9 * 60 * 60 * 1000
  );
  const endOfTodayUTC = new Date(endOfTodayKST.getTime() - 9 * 60 * 60 * 1000);

  const history = await db
    .select()
    .from(historyTable)
    .where(
      and(
        eq(historyTable.userId, parseInt(userId)),
        gte(historyTable.start, startOfTodayUTC),
        lt(historyTable.start, endOfTodayUTC)
      )
    )
    .orderBy(desc(historyTable.start));

  return NextResponse.json(history);
}
