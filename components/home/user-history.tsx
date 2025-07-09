import { getUserHistory } from "@/data/getUserHistory";
import { formatTime } from "@/lib/time";

export default async function UserHistory({ userId }: { userId: string }) {
  const history = await getUserHistory(userId);

  return (
    <div>
      <h2>한 걸음, 한 걸음 집중의 기록</h2>
      <ul>
        {history?.length === 0 && <li>기록 없음</li>}
        {history?.map((item, idx) => (
          <li key={idx}>
            {new Date(item.start).toLocaleTimeString()} ~{" "}
            {new Date(item.end).toLocaleTimeString()} — {item.task} (
            {formatTime(item.duration)})
          </li>
        ))}
      </ul>
    </div>
  );
}
