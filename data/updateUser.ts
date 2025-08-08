"use server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export async function updateUser({
  email,
  nickname,
  image,
  provider,
  providerId,
}: {
  email: string | null;
  nickname?: string | null;
  image?: string;
  provider: string;
  providerId: string;
}) {
  let exisitingUser;
  if (provider === "kakao") {
    exisitingUser = await db
      .select()
      .from(usersTable)
      .where(
        and(
          eq(usersTable.providerId, providerId),
          eq(usersTable.provider, provider)
        )
      );
  } else {
    exisitingUser = await db
      .select()
      .from(usersTable)
      .where(
        and(
          eq(usersTable.email, email as string),
          eq(usersTable.provider, provider)
        )
      );
  }

  if (exisitingUser.length === 0) {
    await db.insert(usersTable).values({
      email,
      nickname,
      image,
      provider,
      providerId,
      createdAt: sql`(now() at time zone 'Asia/Seoul')`,
    });
  }
}
