"use client";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { postComment } from "@/data/postComment";

// 댓글 입력 폼 컴포넌트
interface CommentFormProps {
  postId: number;
  parentId?: number;
  onCommentSubmit?: () => void;
}

export default function CommentForm({
  postId,
  parentId,
  onCommentSubmit,
}: CommentFormProps) {
  const { data: session } = useSession();
  const [state, formAction, isPending] = useActionState(postComment, null);

  useEffect(() => {
    if (state?.comment && parentId) {
      onCommentSubmit?.();
    }
  }, [onCommentSubmit, parentId, state]);

  return (
    <form action={formAction} className="space-y-3 pb-2">
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="userId" defaultValue={session?.user.id} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      <Textarea
        defaultValue={state?.content ?? ""}
        name="content"
        placeholder={parentId ? "대댓글을 남겨주세요." : "댓글을 남겨주세요."}
        className={`${parentId ? "min-h-[44px]" : "min-h-[54px]"} resize-none`}
        disabled={isPending}
      />
      {state?.error && (
        <div className="text-red-400 text-xs">{state.error}</div>
      )}
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending} size="sm">
          {parentId ? "대댓글 작성" : "댓글 작성"}
        </Button>
      </div>
    </form>
  );
}
