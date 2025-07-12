import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/time";
import Link from "next/link";
import { db } from "@/db";
import { communityTable, usersTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/auth";
import WriteButton from "@/components/community/write-button";

// 서버에서 게시글 목록을 미리 가져오는 함수
async function getCommunityPosts() {
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

export default async function CommunityPage() {
  const posts = await getCommunityPosts();
  const session = await auth();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">커뮤니티</h1>
          <span className="text-sm text-gray-500">
            나의 성장 기록을 공유해보세요!
          </span>
        </div>
        {session?.user ? (
          <Link href="/community/write">
            <Button>글쓰기</Button>
          </Link>
        ) : (
          <WriteButton />
        )}
      </div>
      <div className="flex flex-col">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-500">
                아직 작성된 글이 없습니다.
              </p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/community/${post.id}`}
              className="block"
            >
              <div className="flex flex-col gap-2 border-b border-gray-200 py-4">
                <p>{post.title}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">
                    {post.userNickname ||
                      (post.userEmail
                        ? post.userEmail.split("@")[0]
                        : "알 수 없음")}
                  </span>
                  <span>•</span>
                  <span>{getRelativeTime(post.createdAt || new Date())}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
