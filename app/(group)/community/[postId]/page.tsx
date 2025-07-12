import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/time";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { communityTable, usersTable, historyTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// 서버에서 데이터를 미리 가져오는 함수
async function getPostData(postId: string) {
  try {
    // 게시글과 유저 정보 조회
    const post = await db
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
      .where(eq(communityTable.id, parseInt(postId)))
      .limit(1);

    if (post.length === 0) {
      return null;
    }

    // 관련 히스토리 정보 조회
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

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const data = await getPostData(postId);

  if (!data) {
    notFound();
  }

  const { post, history } = data;

  return (
    <div className="container mx-auto p-4">
      {/* 게시글 내용 */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </div>
        </CardContent>
      </Card>

      {/* 관련 히스토리 정보 */}
      {history && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">관련 히스토리</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">작업</span>
                <span>{history.task}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">설명</span>
                <span className="text-gray-600">{history.description}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">시작 시간</span>
                <span>{new Date(history.start).toLocaleString("ko-KR")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">종료 시간</span>
                <span>{new Date(history.end).toLocaleString("ko-KR")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">소요 시간</span>
                <span>{Math.floor(history.duration / 60)}분</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
