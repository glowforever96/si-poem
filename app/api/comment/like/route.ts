import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { commentLikesTable, commentTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const { commentId } = await request.json();
    const userId = parseInt(session.user.id);

    const existingLike = await db
      .select()
      .from(commentLikesTable)
      .where(
        and(
          eq(commentLikesTable.commentId, commentId),
          eq(commentLikesTable.userId, userId)
        )
      );

    if (existingLike.length > 0) {
      // 좋아요 취소
      await db
        .delete(commentLikesTable)
        .where(
          and(
            eq(commentLikesTable.commentId, commentId),
            eq(commentLikesTable.userId, userId)
          )
        );

      await db
        .update(commentTable)
        .set({
          likes: sql`${commentTable.likes} - 1`,
        })
        .where(eq(commentTable.id, commentId));

      revalidateTag("comments");

      return NextResponse.json({
        success: true,
        message: "좋아요가 취소되었습니다.",
      });
    } else {
      // 좋아요 추가
      await db.insert(commentLikesTable).values({
        commentId,
        userId,
      });

      await db
        .update(commentTable)
        .set({
          likes: sql`${commentTable.likes} + 1`,
        })
        .where(eq(commentTable.id, commentId));

      revalidateTag("comments");

      return NextResponse.json({
        success: true,
        message: "좋아요가 추가되었습니다.",
      });
    }
  } catch (error) {
    console.error("좋아요 토글 오류:", error);
    return NextResponse.json(
      { error: "좋아요 처리에 실패했습니다." },
      { status: 500 }
    );
  }
}
