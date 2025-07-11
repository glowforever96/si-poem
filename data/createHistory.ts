"use server";
import { eq } from "drizzle-orm";
import { historyTable, usersTable } from "@/db/schema";

import { db } from "@/db";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

export async function createHistory(history: {
  task: string;
  description: string;
  start: Date;
  end: Date;
  duration: number;
  dateString: string;
}) {
  const session = await auth();
  let user;

  if (session?.user.provider === "kakao") {
    user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, parseInt(session?.user.id as string)))
      .then((rows) => rows[0]);
  } else {
    user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session?.user.email as string))
      .then((rows) => rows[0]);
  }

  if (!user) {
    throw new Error("User not found");
  }

  await db.insert(historyTable).values({
    userId: user.id,
    task: history.task,
    description: history.description ?? "",
    start: history.start,
    end: history.end,
    duration: history.duration,
    dateString: history.dateString,
  });

  revalidateTag("history");
}
