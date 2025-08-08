import { format } from "date-fns";

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
    const dateKey = format(new Date(item.createdAt), "M월 d일");
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
