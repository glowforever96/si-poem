"use client";
import { formatTime } from "@/lib/time";
import useTimer from "@/hooks/useTimer";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Play, Pause, Square, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";

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
    handleReset,
  } = useTimer();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="rounded-2xl shadow-xl border bg-white py-6 px-8 flex flex-col items-center gap-4 mb-10 relative transition-all duration-200">
        <button
          className="bg-[#FEE2E2] text-[#EF4444] absolute top-3 right-3 p-2 rounded-full shadow hover:bg-[#FECACA] transition-all duration-200 disabled:bg-gray-300 disabled:shadow-none disabled:text-[#ffffff] font-medium disabled:cursor-default"
          onClick={handleReset}
          disabled={seconds === 0}
        >
          <Trash2 width={14} height={14} />
        </button>
        <span className="text-base text-muted-foreground font-semibold">
          오늘도 차곡차곡
        </span>
        <div className="text-5xl font-extrabold text-indigo-500 tracking-[0.18em] drop-shadow-sm select-none">
          {formatTime(seconds)}
        </div>
        <div className="flex gap-3 mt-2">
          <button
            className={
              `text-white px-5 py-2 rounded-full shadow-md transition-all duration-200 font-bold disabled:cursor-default ` +
              (task
                ? "bg-gradient-to-r from-indigo-500 to-purple-400 hover:scale-105 hover:shadow-lg"
                : "bg-gray-300")
            }
            onClick={isRunning ? handleStop : handleStart}
            disabled={!task}
          >
            {isRunning ? (
              <Square width={18} height={18} fill="white" />
            ) : (
              <Play width={18} height={18} fill="white" />
            )}
          </button>
          <button
            className="bg-[#64748B] text-white px-5 py-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200 disabled:bg-gray-300 disabled:shadow-none font-bold disabled:cursor-default"
            onClick={handlePause}
            disabled={!isRunning}
          >
            <Pause width={18} height={18} fill="white" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-col gap-1">
          <Label
            className="text-base text-[var(--color-text-secondary)] font-semibold flex items-center gap-1"
            htmlFor="task"
          >
            어떤 일에 몰입하고 계신가요?
            <span className="text-[#EF4444] text-xs">*</span>
          </Label>
          <Input
            ref={inputRef}
            className="text-base shadow focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all"
            id="task"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            disabled={isRunning}
            placeholder="글쓰기, 강의 듣기 등"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label
            className="text-base text-[var(--color-text-secondary)] font-semibold"
            htmlFor="description"
          >
            간단히 덧붙이고 싶은 설명이 있다면
          </Label>
          <Textarea
            id="description"
            className="text-base shadow focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isRunning}
            placeholder="오늘은 집중이 잘 되는 날이에요"
          />
        </div>
      </div>
    </div>
  );
}
