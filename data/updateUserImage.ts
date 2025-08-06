"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateUserImage(imageUrl: string) {
  const session = await auth();

  if (!session?.user) {
    return { ok: false, error: "로그인이 필요합니다." };
  }

  try {
    await db
      .update(usersTable)
      .set({ image: imageUrl })
      .where(eq(usersTable.id, parseInt(session.user.id as string)));
    return { ok: true };
  } catch (error) {
    console.error("프로필 이미지 업데이트 오류:", error);
    return { ok: false, error: "프로필 이미지 업데이트에 실패했습니다." };
  }
}
