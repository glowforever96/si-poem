"use client";

import { useState } from "react";
import { getRelativeTime } from "@/lib/time";
import { Button } from "@/components/ui/button";
import CommentForm from "./comment-form";
import { Comment } from "@/types/histories";

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
    <div className="space-y-4 pt-6">
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
            <div
              key={comment.id}
              className="flex flex-col gap-2 border-t border-gray-200 pt-6"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      {comment.userNickname || "익명"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {getRelativeTime(new Date(comment.createdAt))}
                    </span>
                  </div>
                </div>
                <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                {isLogined && (
                  <div className="flex justify-end">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        setReplyingTo(
                          replyingTo === comment.id ? null : comment.id
                        )
                      }
                      className="text-xs"
                    >
                      {replyingTo === comment.id ? "취소" : "대댓글"}
                    </Button>
                  </div>
                )}
              </div>
              {replyingTo === comment.id && (
                <div className="mt-3">
                  <CommentForm
                    postId={postId}
                    parentId={comment.id}
                    onCommentSubmit={handleCommentSubmit}
                  />
                </div>
              )}
              {comment.replies.length > 0 && (
                <div className="mt-3 space-y-2">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="pl-4 border-l-2 border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {reply.userNickname}
                          </span>
                          <span className="text-xs text-gray-500">
                            {getRelativeTime(new Date(reply.createdAt))}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm whitespace-pre-wrap mt-1">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
