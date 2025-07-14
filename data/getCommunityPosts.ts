import { db } from "@/db";
import { communityTable, usersTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getCommunityPosts() {
  try {
    const posts = await db
      .select({
        id: communityTable.id,
        userId: communityTable.userId,
        historyId: communityTable.historyId,
        title: communityTable.title,
        content: communityTable.content,
        createdAt: communityTable.createdAt,
        updatedAt: communityTable.updatedAt,
        userNickname: usersTable.nickname,
        userEmail: usersTable.email,
      })
      .from(communityTable)
      .leftJoin(usersTable, eq(communityTable.userId, usersTable.id))
      .orderBy(desc(communityTable.createdAt));

    return posts;
  } catch (error) {
    console.error("커뮤니티 글 조회 오류:", error);
    return [];
  }
}
