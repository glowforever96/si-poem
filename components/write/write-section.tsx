"use client";

import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import HistoryCard from "../history-card";
import { UserHistory } from "@/types/histories";
import WriteForm from "./write-form";

export default function WriteSection({ history }: { history: UserHistory[] }) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedHistory, setSelectedHistory] = useState<UserHistory | null>(
    null
  );

  const groupedHistories = history.reduce((acc, history) => {
    const date = new Date(history.start);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const key = `${month}월 ${day}일`;

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(history);
    return acc;
  }, {} as Record<string, UserHistory[]>);

  const filteredHistories = selectedDate
    ? groupedHistories[selectedDate] || []
    : [];

  useEffect(() => {
    setSelectedHistory(null);
  }, [selectedDate]);

  return (
    <>
      <div className="border-b border-gray-200 pb-6">
        <div className="mb-2">
          <Label
            htmlFor="date-select"
            className="text-sm text-[var(--color-text-secondary)] mb-1"
          >
            날짜 선택
          </Label>
          <p className="text-xs text-muted-foreground mb-2">
            작업 기록이 없으면 글쓰기가 불가해요.
          </p>
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
                  <HistoryCard
                    key={history.id}
                    history={history}
                    selectedMode
                    selectedHistory={selectedHistory}
                    onClick={() => setSelectedHistory(history)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <WriteForm selectedHistory={selectedHistory} />
    </>
  );
}
