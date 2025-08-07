"use client";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { postComment } from "@/data/postComment";
import { Input } from "../ui/input";

interface CommentFormProps {
  postId: number;
  parentId?: number;
  onCommentSubmit?: () => void;
  onClickCancel?: () => void;
}

export default function CommentForm({
  postId,
  parentId,
  onCommentSubmit,
  onClickCancel,
}: CommentFormProps) {
  const { data: session } = useSession();
  const [state, formAction, isPending] = useActionState(postComment, null);

  useEffect(() => {
    if (state?.comment && parentId) {
      onCommentSubmit?.();
    }
  }, [onCommentSubmit, parentId, state]);

  return (
    <form
      action={formAction}
      className={`space-y-3 pb-2 ${parentId && "ml-8"}`}
    >
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="userId" defaultValue={session?.user.id} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      <Input
        defaultValue={state?.content ?? ""}
        name="content"
        placeholder={parentId ? "대댓글을 남겨주세요." : "댓글을 남겨주세요."}
        className="h-[44px] resize-none"
        disabled={isPending}
      />
      {state?.error && (
        <div className="text-red-400 text-xs">{state.error}</div>
      )}
      <div className="flex justify-end">
        <div className="flex gap-2">
          {parentId && (
            <Button onClick={onClickCancel} variant="outline" size="sm">
              취소
            </Button>
          )}
          <Button type="submit" disabled={isPending} size="sm">
            작성
          </Button>
        </div>
      </div>
    </form>
  );
}
