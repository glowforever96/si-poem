import { Card } from "./ui/card";
import { formatDurationKR, formatKoreanTime } from "@/lib/time";

import { GuestHistory } from "@/stores/useGuestHistoryStore";
import { UserHistory } from "@/types/histories";

export default function HistoryCard({
  history,
  selectedMode,
  selectedHistory,
  onClick,
}: {
  history: UserHistory | GuestHistory;
  selectedMode: boolean;
  selectedHistory?: UserHistory | null;
  onClick?: (history: UserHistory) => void;
}) {
  const { task, description, start, end, duration } = history;

  return (
    <Card
      className={`mb-2 p-4 ${
        selectedMode &&
        selectedHistory?.id === (history as UserHistory).id &&
        "border-[var(--color-purple-primary)] bg-[#f5f4fd]"
      } ${selectedMode ? "cursor-pointer" : ""}`}
      onClick={
        selectedMode && onClick
          ? () => onClick(history as UserHistory)
          : undefined
      }
    >
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-gray-800 truncate">{task}</div>
        {description && (
          <div className="text-sm text-gray-500 truncate">{description}</div>
        )}
        <div className="flex justify-between items-end mt-2">
          <span className="text-sm text-gray-400 font-medium">
            {start ? formatKoreanTime(start as Date) : "-"} ~{" "}
            {end ? formatKoreanTime(end as Date) : "-"}
          </span>
          <span className="font-medium text-[#6C5CE7]">
            총 {formatDurationKR(duration)} 집중했어요!
          </span>
        </div>
      </div>
    </Card>
  );
}
