"use client";
import { formatTime } from "@/lib/time";
import useTimer from "@/hooks/useTimer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Play, Pause, Square, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";

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
    <div className="flex flex-col items-center border-b border-gray-200 pb-4">
      <div className="rounded-xl shadow-md border bg-white py-4 px-6 flex flex-col items-center gap-2 mb-4 relative">
        <button
          className="bg-[#FEE2E2] text-[#EF4444] absolute top-2 right-2 p-1.5 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 disabled:bg-gray-300 disabled:shadow-none disabled:text-[#ffffff] font-medium disabled:cursor-default hover:bg-[#FECACA]"
          onClick={handleReset}
          disabled={seconds === 0}
        >
          <Trash2 width={15} height={15} />
        </button>
        <span className="text-sm text-muted-foreground">오늘도 차곡차곡</span>
        <div className="text-4xl font-mono tracking-[0.3em] text-gray-800">
          {formatTime(seconds)}
        </div>
        <div className="flex gap-2">
          <button
            className="bg-[#6C5CE7] text-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 disabled:bg-gray-300 disabled:shadow-none font-medium disabled:cursor-default"
            onClick={isRunning ? handleStop : handleStart}
            disabled={!task}
          >
            {isRunning ? (
              <Square width={15} height={15} fill="white" />
            ) : (
              <Play width={15} height={15} fill="white" />
            )}
          </button>
          <button
            className="bg-[#64748B] text-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 disabled:bg-gray-300 disabled:shadow-none font-medium disabled:cursor-default"
            onClick={handlePause}
            disabled={!isRunning}
          >
            <Pause width={15} height={15} fill="white" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-[100%]">
        <div className="flex flex-col gap-1">
          <Label
            className="text-sm text-[var(--color-text-secondary)] flex items-center gap-1"
            htmlFor="task"
          >
            어떤 일에 몰입하고 계신가요?
            <span className="text-[#EF4444] text-xs">*</span>
          </Label>
          <Input
            ref={inputRef}
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
            placeholder="오늘은 집중이 잘 되는 날이에요"
          />
        </div>
      </div>
    </div>
  );
}
