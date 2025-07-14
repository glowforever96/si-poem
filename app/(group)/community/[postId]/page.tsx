import { getRelativeTime } from "@/lib/time";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { communityTable, usersTable, historyTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import HistoryCard from "@/components/history-card";

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

  console.log(history);

  return (
    <div className="flex flex-col p-4">
      {/* 게시글 내용 */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="text-xl font-bold mb-2">{post.title}</div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">
                {post.userNickname && post.userNickname}
              </span>
              <span>•</span>
              <span>{getRelativeTime(post.createdAt || new Date())}</span>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              <ChatBubbleIcon />
            </div>
          </div>
        </div>
      </div>
      {history && <HistoryCard history={history} selectedMode={false} />}
      <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap mt-2">
        {post.content}
      </p>
    </div>
  );
}
