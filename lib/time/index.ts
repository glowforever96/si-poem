// 시간 포맷 (hh:mm:ss)
export const formatTime = (sec: number) => {
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

// 월, 일 string 반환
export const todayString = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${month}월 ${day}일`;
};

// 시간 포맷: 오전/오후 X:XX
export const formatKoreanTime = (date: Date) => {
  const h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, "0");
  const isAM = h < 12;
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${isAM ? "오전" : "오후"} ${hour12}:${m}`;
};

// duration(초)을 "X시간 Y분 Z초"로 변환
export const formatDurationKR = (seconds: number) => {
  if (seconds < 60) return `${seconds}초`;
  const hour = Math.floor(seconds / 3600);
  const min = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;
  let result = "";
  if (hour > 0) result += `${hour}시간 `;
  if (min > 0) result += `${min}분 `;
  if (sec > 0 || result === "") result += `${sec}초`;
  return result.trim();
};
