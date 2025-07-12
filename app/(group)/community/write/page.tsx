"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllUserHistory } from "@/data/getUserHistory";
import { createCommunityPost } from "@/data/createCommunityPost";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface History {
  id: number;
  userId: number;
  task: string;
  description: string;
  start: string;
  end: string;
  duration: number;
  dateString: string;
}

export default function WritePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [histories, setHistories] = useState<History[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedHistory, setSelectedHistory] = useState<History | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [historiesLoading, setHistoriesLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchHistories = async () => {
      try {
        const data = await getAllUserHistory(session.user.id as string);
        setHistories(data);
      } catch (error) {
        console.error("히스토리 조회 오류:", error);
      } finally {
        setHistoriesLoading(false);
      }
    };

    fetchHistories();
  }, [session?.user?.id]);

  // 히스토리를 날짜별로 그룹화
  const groupedHistories = histories.reduce((acc, history) => {
    const date = new Date(history.start);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const key = `${month}월 ${day}일`;

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(history);
    return acc;
  }, {} as Record<string, History[]>);

  // 선택된 날짜의 히스토리만 필터링
  const filteredHistories = selectedDate
    ? groupedHistories[selectedDate] || []
    : [];

  // 날짜 선택이 변경되면 선택된 히스토리 초기화
  useEffect(() => {
    setSelectedHistory(null);
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !session?.user?.id ||
      !selectedHistory ||
      !title.trim() ||
      !content.trim()
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      await createCommunityPost({
        userId: parseInt(session.user.id),
        historyId: selectedHistory.id,
        title: title.trim(),
        content: content.trim(),
      });

      alert("글이 성공적으로 작성되었습니다!");
      router.push("/community");
    } catch (error) {
      console.error("글 작성 오류:", error);
      alert("글 작성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (historiesLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-2">글쓰기</h1>
        <p className="text-gray-600 text-sm">집중의 기록을 공유해보세요!</p>
      </div>
      <div className="grid grid-cols-1 gap-6 overflow-scroll pb-[100px]">
        {/* 히스토리 선택 섹션 */}
        <div className="border-b border-gray-200 pb-6">
          <div className="mb-2">
            <Label
              htmlFor="date-select"
              className="text-sm text-[var(--color-text-secondary)] mb-1"
            >
              날짜 선택
            </Label>
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="날짜를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(groupedHistories).map((date) => (
                  <SelectItem key={date} value={date}>
                    {date}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 선택된 날짜의 히스토리 목록 */}
          {selectedDate && (
            <div className="space-y-4">
              {filteredHistories.length === 0 ? (
                <Card>
                  <CardContent className="p-4">
                    <p className="text-center text-gray-500">
                      해당 날짜에 히스토리가 없습니다.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  {filteredHistories.map((history) => (
                    <Card
                      key={history.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedHistory?.id === history.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedHistory(history)}
                    >
                      <div className="font-medium">{history.task}</div>
                      <div className="text-sm text-gray-600">
                        {history.description}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(history.start).toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(history.end).toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 글 작성 섹션 */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="title"
                className="text-sm text-[var(--color-text-secondary)] mb-1"
              >
                제목
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="글 제목을 입력하세요"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="content"
                className="text-sm text-[var(--color-text-secondary)] mb-1"
              >
                내용
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="resize-none"
                placeholder="글 내용을 입력하세요"
                rows={10}
                required
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                취소
              </Button>
              <Button type="submit" disabled={loading || !selectedHistory}>
                {loading ? "작성 중..." : "글 작성"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
