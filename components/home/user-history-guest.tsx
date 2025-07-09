"use client";
import { formatTime } from "@/lib/time";
import { useGuestHistoryStore } from "@/stores/useGuestHistoryStore";
import { useEffect, useState } from "react";

export default function UserHistoryGuest() {
  const { history } = useGuestHistoryStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>한 걸음, 한 걸음 집중의 기록</h2>
      <span>
        앱을 종료하면 기록이 사라집니다. 로그인 해서 전부 이용해보세요!
      </span>
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
