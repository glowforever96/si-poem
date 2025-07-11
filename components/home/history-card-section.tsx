"use client";

import { formatDurationKR, formatKoreanTime, todayString } from "@/lib/time";
import { History } from "@/stores/useGuestHistoryStore";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";

export default function HistoryCardSection({
  history,
  isGuest,
}: {
  history: History[];
  isGuest: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 mt-3 flex-1 min-h-0">
      <div className="flex justify-between items-center">
        <div className="text-sm text-[var(--color-text-secondary)] font-medium">
          한 걸음, 한 걸음 집중의 기록
        </div>
        <div className="text-sm text-muted-foreground">{todayString()}</div>
      </div>
      {isGuest && (
        <span className="text-xs text-muted-foreground">
          앱을 종료하면 기록이 사라집니다. 로그인 해서 전부 이용해보세요!
        </span>
      )}
      {history?.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-lg font-medium">
          오늘의 집중 기록이 없어요.
        </div>
      )}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-[calc(100%-5rem)] mt-1">
          {history?.map((item, idx) => (
            <Card key={idx} className="mb-2 p-4">
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-base text-gray-800 truncate">
                  {item.task}
                </div>
                {item.description && (
                  <div className="text-xs text-gray-400 truncate">
                    {item.description}
                  </div>
                )}
                <div className="flex justify-between items-end mt-2">
                  <span className="text-xs text-gray-400 font-medium">
                    {item.start ? formatKoreanTime(new Date(item.start)) : "-"}{" "}
                    ~ {item.end ? formatKoreanTime(new Date(item.end)) : "-"}
                  </span>
                  <span className="text-sm font-medium text-[#6C5CE7]">
                    총 {formatDurationKR(item.duration)} 집중했어요!
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
