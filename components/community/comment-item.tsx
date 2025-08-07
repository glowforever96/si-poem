"use client";
import { getRelativeTime } from "@/lib/time";
import CommentForm from "./comment-form";
import { Comment } from "@/types/histories";
import Image from "next/image";
import LikeIcon from "/public/like.svg";
import useOptimisticLike from "@/hooks/useOptimisticLike";

interface CommentItemProps {
  comment: Comment & { replies: Comment[] };
  postId: number;
  isLogined: boolean;
  replyingTo: number | null;
  setReplyingTo: (id: number | null) => void;
  onCommentSubmit: () => void;
}

export default function CommentItem({
  comment,
  postId,
  isLogined,
  replyingTo,
  setReplyingTo,
  onCommentSubmit,
}: CommentItemProps) {
  const { likes, liked, toggleLike } = useOptimisticLike({
    commentId: comment.id,
    initialLikes: comment.likes || 0,
    initialLiked: comment.liked || false,
  });

  return (
    <div className="flex flex-col gap-2 pt-6">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                <Image
                  priority
                  src={comment.image as string}
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                  alt="유저 프로필 이미지"
                />
              </div>
              <span className="font-medium text-sm">
                {comment.userNickname}
              </span>
              {comment.isMine && (
                <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 ml-0.5">
                  작성자
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {getRelativeTime(new Date(comment.createdAt))}
            </span>
          </div>
        </div>
        <p className="text-sm whitespace-pre-wrap ml-8">{comment.content}</p>
        <div className="flex gap-3 items-center ml-8 mt-2">
          {isLogined && (
            <div
              onClick={() => setReplyingTo(comment.id)}
              className="text-sm font-semibold cursor-pointer"
            >
              답글 쓰기
            </div>
          )}
          <div
            className={`flex gap-1 items-center justify-center transition-colors ${
              isLogined ? "cursor-pointer" : "cursor-default"
            }`}
            onClick={isLogined ? toggleLike : undefined}
          >
            <LikeIcon
              className={`w-4 h-4 ${
                liked ? "text-black fill-current" : "text-gray-400"
              }`}
            />
            <div
              className={`text-xs ${
                liked ? "text-black font-extrabold" : "text-gray-500"
              }`}
            >
              {likes}
            </div>
          </div>
        </div>
      </div>

      {replyingTo === comment.id && (
        <div className="mt-3">
          <CommentForm
            postId={postId}
            parentId={comment.id}
            onClickCancel={() => setReplyingTo(null)}
            onCommentSubmit={onCommentSubmit}
          />
        </div>
      )}
      {comment.replies.length > 0 && (
        <div className="mt-3 space-y-2">
          {comment.replies.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} isLogined={isLogined} />
          ))}
        </div>
      )}
    </div>
  );
}

interface ReplyItemProps {
  reply: Comment;
  isLogined: boolean;
}

function ReplyItem({ reply, isLogined }: ReplyItemProps) {
  const { likes, liked, toggleLike } = useOptimisticLike({
    commentId: reply.id,
    initialLikes: reply.likes || 0,
    initialLiked: reply.liked || false,
  });

  return (
    <div className="pl-4 border-l-2 border-gray-200 ml-8">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
              <Image
                priority
                src={reply.image as string}
                width={24}
                height={24}
                className="w-full h-full object-cover"
                alt="유저 프로필 이미지"
              />
            </div>
            <span className="font-medium text-sm">{reply.userNickname}</span>
            {reply.isMine && (
              <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 ml-0.5">
                작성자
              </div>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {getRelativeTime(new Date(reply.createdAt))}
          </span>
        </div>
      </div>
      <p className="text-sm whitespace-pre-wrap mt-1">{reply.content}</p>
      <div className="flex gap-3 items-center mt-2">
        <div
          className={`flex gap-1 items-center justify-center transition-colors ${
            isLogined ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={isLogined ? toggleLike : undefined}
        >
          <LikeIcon
            className={`w-4 h-4 ${
              liked ? "text-black fill-current" : "text-gray-400"
            }`}
          />
          <div
            className={`text-xs ${
              liked ? "text-black font-extrabold" : "text-gray-500"
            }`}
          >
            {likes}
          </div>
        </div>
      </div>
    </div>
  );
}
