import { communityTable } from "./../../../db/schema";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { commentTable, usersTable, commentLikesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// 댓글/대댓글 조회
export async function GET(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("postId");
    const userId = req.nextUrl.searchParams.get("userId");

    const comments = await db
      .select({
        id: commentTable.id,
        postId: commentTable.postId,
        userId: commentTable.userId,
        content: commentTable.content,
        parentId: commentTable.parentId,
        createdAt: commentTable.createdAt,
        likes: commentTable.likes,
        userNickname: usersTable.nickname,
        image: usersTable.image,
      })
      .from(commentTable)
      .leftJoin(usersTable, eq(commentTable.userId, usersTable.id))
      .where(eq(commentTable.postId, Number(postId)))
      .orderBy(commentTable.createdAt);

    let commentsWithLikeStatus = comments;

    const postAuthor = await db
      .select({ userId: communityTable.userId })
      .from(communityTable)
      .where(eq(communityTable.id, Number(postId)))
      .then((rows) => rows[0]);

    if (userId) {
      const userLikes = await db
        .select({
          commentId: commentLikesTable.commentId,
        })
        .from(commentLikesTable)
        .where(eq(commentLikesTable.userId, parseInt(userId)));

      const likedCommentIds = new Set(userLikes.map((like) => like.commentId));

      commentsWithLikeStatus = comments.map((comment) => ({
        ...comment,
        liked: likedCommentIds.has(comment.id),
        isMine: comment.userId === postAuthor.userId,
      }));
    } else {
      // 비로그인 사용자
      commentsWithLikeStatus = comments.map((comment) => ({
        ...comment,
        liked: false,
        isMine: comment.userId === postAuthor.userId,
      }));
    }

    return NextResponse.json({ comments: commentsWithLikeStatus });
  } catch (error) {
    console.error("댓글 조회 오류:", error);
    return NextResponse.json({ error: "댓글 조회 실패" }, { status: 500 });
  }
}
