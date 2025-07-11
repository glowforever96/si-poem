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
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const endOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );

  const history = await db
    .select()
    .from(historyTable)
    .where(
      and(
        eq(historyTable.userId, parseInt(userId)),
        gte(historyTable.start, startOfToday),
        lt(historyTable.start, endOfToday)
      )
    )
    .orderBy(desc(historyTable.start));

  return NextResponse.json(history);
}
