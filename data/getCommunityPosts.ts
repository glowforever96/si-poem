import { db } from "@/db";
import { commentTable, communityTable, usersTable } from "@/db/schema";
import { count, desc, eq, inArray } from "drizzle-orm";

// 커뮤니티 게시글 목록 + 각 게시글별 댓글 개수 조회
export async function getCommunityPosts(type: number) {
  try {
    // 게시글 + 유저 정보 조회
    const baseQuery = db
      .select({
        id: communityTable.id,
        userId: communityTable.userId,
        historyId: communityTable.historyId,
        title: communityTable.title,
        content: communityTable.content,
        createdAt: communityTable.createdAt,
        updatedAt: communityTable.updatedAt,
        views: communityTable.views,
        image: usersTable.image,
        userNickname: usersTable.nickname,
        userEmail: usersTable.email,
      })
      .from(communityTable)
      .leftJoin(usersTable, eq(communityTable.userId, usersTable.id));

    const query =
      typeof type === "number" && type !== 0
        ? baseQuery.where(eq(communityTable.type, type))
        : baseQuery;

    const res = await query.orderBy(desc(communityTable.createdAt)).execute();

    const postIds = res.map((post) => post.id);

    // 각 게시글별 댓글 개수 한 번에 조회
    const commentCounts = postIds.length
      ? await db
          .select({
            postId: commentTable.postId,
            count: count(),
          })
          .from(commentTable)
          .where(inArray(commentTable.postId, postIds))
          .groupBy(commentTable.postId)
      : [];

    const commentCountMap = Object.fromEntries(
      commentCounts.map((row) => [row.postId, row.count])
    );

    const posts = res.map((post) => ({
      ...post,
      commentCount: commentCountMap[post.id] ?? 0,
    }));

    return posts;
  } catch (error) {
    console.error("커뮤니티 글 조회 오류:", error);
    return [];
  }
}
