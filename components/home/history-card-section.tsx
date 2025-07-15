"use client";

import { todayString } from "@/lib/time";
import { ScrollArea } from "../ui/scroll-area";
import HistoryCard from "../history-card";
import { GuestHistory } from "@/stores/useGuestHistoryStore";
import { UserHistory } from "@/types/histories";

export default function HistoryCardSection({
  history,
  isGuest,
}: {
  history: UserHistory[] | GuestHistory[];
  isGuest: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 mt-3 flex-1 min-h-0">
      <div className="flex justify-between items-center">
        <div className="text-[var(--color-text-secondary)] font-semibold text-lg">
          한 걸음, 한 걸음 집중의 기록
        </div>
        <span className="text-sm text-muted-foreground font-medium">
          {todayString()}
        </span>
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
            <HistoryCard key={idx} history={item} selectedMode={false} />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
