"use client";
import { formatTime } from "@/lib/time";
import useTimer from "@/hooks/useTimer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export default function TimerSection() {
  const {
    seconds,
    isRunning,
    task,
    setTask,
    description,
    setDescription,
    handleStart,
    handlePause,
    handleStop,
  } = useTimer();

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-xl shadow-md border bg-white py-4 px-6 flex flex-col items-center gap-2 mb-4">
        <span className="text-sm text-muted-foreground">오늘도 차곡차곡</span>
        <div className="text-4xl font-mono tracking-[0.3em] text-gray-800">
          {formatTime(seconds)}
        </div>
      </div>
      <div className="flex flex-col gap-3 w-[100%]">
        <div className="flex flex-col gap-1">
          <Label
            className="text-sm text-[var(--color-text-secondary)]"
            htmlFor="task"
          >
            어떤 일에 몰입하고 계신가요?
          </Label>
          <Input
            id="task"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            disabled={isRunning}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label
            className="text-sm text-[var(--color-text-secondary)]"
            htmlFor="description"
          >
            간단히 덧붙이고 싶은 설명이 있다면
          </Label>
          <Textarea
            id="description"
            className="resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isRunning}
          />
        </div>
      </div>
      {/* 버튼 영역 */}
      <div className="flex gap-2 mt-2">
        <button
          className="bg-[#6C5CE7] text-white px-4 py-1 rounded disabled:bg-gray-300"
          onClick={handleStart}
          disabled={isRunning || !task}
          // 작업 시작 버튼
        >
          작업 시작
        </button>
        <button
          className="bg-yellow-400 text-white px-4 py-1 rounded disabled:bg-gray-300"
          onClick={handlePause}
          disabled={!isRunning}
          // 일시정지 버튼
        >
          일시정지
        </button>
        <button
          className="bg-red-500 text-white px-4 py-1 rounded disabled:bg-gray-300"
          onClick={handleStop}
          disabled={!isRunning}
          // 종료 버튼
        >
          종료
        </button>
      </div>
    </div>
  );
}
