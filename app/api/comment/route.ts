import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { commentTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// 댓글/대댓글 조회
export async function GET(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("postId");

    const comments = await db
      .select({
        id: commentTable.id,
        postId: commentTable.postId,
        userId: commentTable.userId,
        content: commentTable.content,
        parentId: commentTable.parentId,
        createdAt: commentTable.createdAt,
        userNickname: usersTable.nickname,
        image: usersTable.image,
      })
      .from(commentTable)
      .leftJoin(usersTable, eq(commentTable.userId, usersTable.id))
      .where(eq(commentTable.postId, Number(postId)))
      .orderBy(commentTable.createdAt);

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("댓글 조회 오류:", error);
    return NextResponse.json({ error: "댓글 조회 실패" }, { status: 500 });
  }
}
