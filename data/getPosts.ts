import { db } from "@/db";
import { communityTable, historyTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// 게시글과 유저 정보 조회
export async function getPostData(postId: string) {
  try {
    const post = await db
      .select({
        id: communityTable.id,
        userId: communityTable.userId,
        historyId: communityTable.historyId,
        title: communityTable.title,
        content: communityTable.content,
        createdAt: communityTable.createdAt,
        updatedAt: communityTable.updatedAt,
        image: usersTable.image,
        userNickname: usersTable.nickname,
        userEmail: usersTable.email,
      })
      .from(communityTable)
      .leftJoin(usersTable, eq(communityTable.userId, usersTable.id))
      .where(eq(communityTable.id, parseInt(postId)))
      .limit(1);

    if (post.length === 0) {
      return null;
    }

    const history = await db
      .select()
      .from(historyTable)
      .where(eq(historyTable.id, post[0].historyId))
      .limit(1);

    return {
      post: post[0],
      history: history[0] || null,
    };
  } catch (error) {
    console.error("게시글 조회 오류:", error);
    return null;
  }
}
