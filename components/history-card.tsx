import { getHistoryTypeString } from "@/lib/getHistoryTypeString";
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
  const { task, description, start, end, type, duration } = history;

  return (
    <Card
      className={`mb-4 p-3 ${
        selectedMode &&
        selectedHistory?.id === (history as UserHistory).id &&
        "border-[var(--color-purple-primary)]"
      } ${selectedMode ? "cursor-pointer" : ""}`}
      onClick={
        selectedMode && onClick
          ? () => onClick(history as UserHistory)
          : undefined
      }
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="typo-body-1-medium text-gray-800">{task}</div>
          <div className="typo-body-2-regular text-gray-600">
            {getHistoryTypeString(type)}
          </div>
        </div>
        {description && (
          <div className="typo-body-2-medium text-gray-500">{description}</div>
        )}
        <div className="flex justify-between items-end mt-2">
          <span className="typo-caption-medium text-gray-400">
            {start ? formatKoreanTime(start as Date) : "-"} ~{" "}
            {end ? formatKoreanTime(end as Date) : "-"}
          </span>
          <span className="typo-body-2-bold text-[#6C5CE7]">
            총 {formatDurationKR(duration)} 집중했어요!
          </span>
        </div>
      </div>
    </Card>
  );
}
