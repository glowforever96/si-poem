import { db } from "@/db";
import { historyTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  const history = await db
    .select()
    .from(historyTable)
    .where(eq(historyTable.userId, parseInt(userId)))
    .orderBy(desc(historyTable.start));

  return NextResponse.json(history);
}
