"use client";
import { useState } from "react";
import CommentForm from "./comment-form";
import { Comment } from "@/types/histories";
import CommentItem from "./comment-item";

interface CommentListProps {
  postId: number;
  groupedComments: Record<number, Comment & { replies: Comment[] }>;
  commentLength: number;
  isLogined: boolean;
}

export default function CommentList({
  postId,
  groupedComments,
  commentLength,
  isLogined,
}: CommentListProps) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleCommentSubmit = () => {
    setReplyingTo(null);
  };

  return (
    <div className="space-y-4 pt-6 pb-6">
      <div className="space-y-4">
        <div className="text-lg font-bold flex items-center justify-between">
          <div>댓글 ({commentLength})</div>
          {!isLogined && (
            <span className="text-xs text-muted-foreground">
              게스트 사용자는 읽기모드만 가능합니다.
            </span>
          )}
        </div>
        {isLogined && <CommentForm postId={postId} />}

        {Object.values(groupedComments).length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-8">
            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
          </div>
        ) : (
          Object.values(groupedComments).map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              isLogined={isLogined}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              onCommentSubmit={handleCommentSubmit}
            />
          ))
        )}
      </div>
    </div>
  );
}
