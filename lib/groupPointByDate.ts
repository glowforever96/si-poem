import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ko } from "date-fns/locale";
type PointHistoryItem = {
  id: number;
  userId: number;
  points: number;
  reason: string;
  createdAt: string | Date;
};

export const groupPointByDate = (data: PointHistoryItem[]) => {
  return data.reduce<
    Record<string, { points: number; reason: string; id: number }[]>
  >((acc, item) => {
    const zonedDate = toZonedTime(item.createdAt, "Asia/Seoul");
    const dateKey = format(zonedDate, "M월 d일", { locale: ko });

    const { points, reason, id } = item;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push({
      id,
      points,
      reason,
    });
    return acc;
  }, {});
};
