import { getRelativeTime } from "@/lib/time";
import { notFound } from "next/navigation";

import { ChatBubbleIcon } from "@radix-ui/react-icons";
import HistoryCard from "@/components/history-card";
import CommentList from "@/components/community/comment-list";
import { getPostData } from "@/data/getPosts";
import { getComments } from "@/data/getComments";
import { Comment } from "@/types/histories";
import { auth } from "@/auth";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const session = await auth();
  const [postData, commentsData] = await Promise.all([
    getPostData(postId),
    getComments(postId),
  ]);

  const { post, history } = postData || {};
  const { comments }: { comments: Comment[] } = commentsData;

  if (!post || !history || !comments) {
    notFound();
  }

  const commentLength = comments.length;

  const groupedComments = comments.reduce((acc, comment) => {
    if (comment.parentId === null) {
      // 부모 댓글
      acc[comment.id] = {
        ...comment,
        replies: comments.filter((c) => c.parentId === comment.id),
      };
    }
    return acc;
  }, {} as Record<number, Comment & { replies: Comment[] }>);

  return (
    <div className="flex flex-col pt-[16px] pr-[16px] pb-[6rem] pl-[16px]">
      <div className="mb-6 border-b border-gray-200 pb-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="text-xl font-bold mb-3">{post.title}</div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">
                {post.userNickname && post.userNickname}
              </span>
              <span>•</span>
              <span>{getRelativeTime(post.createdAt || new Date())}</span>
            </div>
            <div className="text-gray-600 mt-3">
              <div className="flex items-center gap-1">
                <ChatBubbleIcon />
                <span className="text-xs">{commentLength}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {history && <HistoryCard history={history} selectedMode={false} />}
      <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap mt-4 pb-6 border-b border-gray-200">
        {post.content}
      </p>
      <CommentList
        postId={post.id}
        groupedComments={groupedComments}
        commentLength={commentLength}
        isLogined={!!session?.user}
      />
    </div>
  );
}
