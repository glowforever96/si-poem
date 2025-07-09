"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateNickname(nickname: string) {
  const session = await auth();

  const existingNickname = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.nickname, nickname));

  console.log(existingNickname);

  if (existingNickname.length > 0) {
    return { ok: false, error: "이미 존재하는 닉네임입니다." };
  }

  await db
    .update(usersTable)
    .set({ nickname })
    .where(eq(usersTable.email, session?.user.email as string));

  return { ok: true };
}
