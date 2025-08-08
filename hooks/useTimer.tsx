import { createHistory } from "@/data/createHistory";
import { useGuestHistoryStore } from "@/stores/useGuestHistoryStore";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

const useTimer = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const { data: session } = useSession();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { addHistory } = useGuestHistoryStore();
  // 입력 상태
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [selectType, setSelectType] = useState<string | number>("");

  const [startTime, setStartTime] = useState<Date | null>(null);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    setStartTime(new Date());
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  // 타이머 일시정지
  const handlePause = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // 타이머 종료 및 기록 저장
  const handleStop = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    // 로그인 사용자 db 저장
    if (startTime && session) {
      await createHistory({
        task,
        description,
        start: startTime,
        end: new Date(),
        type: selectType as number,
        duration: seconds,
        dateString: format(startTime, "yyyy-MM-dd"),
      });

      // 서버 컴포넌트 리프레쉬
      startTransition(() => {
        router.refresh();
      });
    }
    // 게스트 사용자 세션 스토리지 저장
    else {
      addHistory({
        task,
        description,
        start: startTime,
        end: new Date(),
        type: selectType as number,
        duration: seconds,
      });
    }
    resetState();
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    resetState();
  };

  const resetState = () => {
    setSeconds(0);
    setTask("");
    setSelectType("");
    setDescription("");
    setStartTime(null);
  };

  return {
    seconds,
    isRunning,
    task,
    setTask,
    description,
    setDescription,
    selectType,
    setSelectType,
    handleStart,
    handlePause,
    handleStop,
    handleReset,
  };
};

export default useTimer;
