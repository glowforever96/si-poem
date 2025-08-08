"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { UserHistory } from "@/types/histories";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { CheckIcon } from "@radix-ui/react-icons";

export default function WriteForm({
  selectedHistory,
}: {
  selectedHistory: UserHistory | null;
}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        body: JSON.stringify({
          userId: parseInt(session?.user.id as string),
          historyId: selectedHistory?.id as number,
          title: title,
          content: content,
          type: selectedHistory?.type,
        }),
      });
      if (!res.ok) {
        throw new Error("글 작성에 실패했습니다.");
      }
      toast(
        <div className="text-[var(--color-text-primary)] font-medium flex items-center justify-center gap-1">
          <CheckIcon />
          <span>포스트가 작성되었습니다!</span>
        </div>
      );
      router.push("/community");
    } catch (error) {
      console.error("글 작성 오류:", error);
      alert("글 작성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label
            htmlFor="title"
            className="text-sm text-[var(--color-text-secondary)] flex items-center gap-1 mb-1"
          >
            제목 <span className="text-[#EF4444] text-xs">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="글 제목을 입력하세요"
            required
          />
        </div>

        <div>
          <Label
            htmlFor="content"
            className="text-sm text-[var(--color-text-secondary)] flex items-center gap-1 mb-1"
          >
            내용<span className="text-[#EF4444] text-xs">*</span>
          </Label>
          <Textarea
            id="content"
            name="content"
            onChange={(e) => setContent(e.target.value)}
            className="resize-none"
            placeholder="글 내용을 입력하세요"
            rows={10}
            required
          />
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit" disabled={loading || !selectedHistory}>
            {loading ? "작성 중..." : "작성"}
          </Button>
        </div>
      </form>
    </div>
  );
}
