/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { db } from "@/db";
import { commentTable } from "@/db/schema";
import { revalidateTag } from "next/cache";

export async function postComment(_: any, formData: FormData) {
  const postId = Number(formData.get("postId"));
  const userId = Number(formData.get("userId"));
  const content = formData.get("content")?.toString() ?? "";
  const parentId = formData.get("parentId")
    ? Number(formData.get("parentId"))
    : null;

  if (!postId || !userId || !content.trim()) {
    return { error: "댓글을 작성하세요.", content: content };
  }

  const [newComment] = await db
    .insert(commentTable)
    .values({
      postId,
      userId,
      content,
      parentId: parentId ?? null,
    })
    .returning();

  revalidateTag("comments");

  return { comment: newComment };
}
