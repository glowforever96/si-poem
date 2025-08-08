"use client";
import { formatTime } from "@/lib/time";
import useTimer from "@/hooks/useTimer";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Play, Pause, Square, Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { PostType } from "../community/filter-chips";
import { POST_TYPE_LABEL } from "@/types/histories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function TimerSection() {
  const {
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
  } = useTimer();

  const postTypeOptions = Object.entries(POST_TYPE_LABEL).map(
    ([value, label]) => ({
      value: Number(value) as PostType,
      label,
    })
  );

  return (
    <div className="flex flex-col items-center w-full h-full mt-10">
      <div className="rounded-2xl shadow-xl border bg-white py-6 px-8 flex flex-col items-center gap-4 mb-10 relative transition-all duration-200">
        <button
          className="bg-[#FEE2E2] text-[#EF4444] absolute top-3 right-3 p-2 rounded-full shadow hover:bg-[#FECACA] transition-all duration-200 disabled:bg-gray-300 disabled:shadow-none disabled:text-[#ffffff] font-medium disabled:cursor-default"
          onClick={handleReset}
          disabled={seconds === 0}
        >
          <Trash2 width={14} height={14} />
        </button>
        <span className="typo-label text-muted-foreground">
          오늘도 차곡차곡
        </span>
        <div className="text-5xl font-bold text-[var(--color-purple-primary)] tracking-[0.15em] drop-shadow-sm select-none">
          {formatTime(seconds)}
        </div>
        <div className="flex gap-3 mt-2">
          <button
            className={
              `text-white px-5 py-2 rounded-full shadow-md transition-all duration-200 font-bold disabled:cursor-default ` +
              (task && selectType
                ? "bg-gradient-to-r from-[var(--color-purple-primary)] to-purple-400 hover:scale-105 hover:shadow-lg"
                : "bg-gray-300")
            }
            onClick={isRunning ? handleStop : handleStart}
            disabled={!task && selectType === ""}
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
            className="typo-body-2-medium text-[var(--color-text-secondary)] flex items-center gap-1"
            htmlFor="task"
          >
            어떤 일에 몰입하고 계신가요?
            <span className="text-[#EF4444] text-xs">*</span>
          </Label>
          <Input
            className="typo-body-2-regular focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all"
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
            className="typo-body-2-medium text-[var(--color-text-secondary)] flex items-center gap-1"
            htmlFor="task"
          >
            작업 타입
            <span className="text-[#EF4444] text-xs">*</span>
          </Label>
          <Select
            value={String(selectType)}
            onValueChange={(val) => setSelectType(Number(val))}
            disabled={isRunning}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="작업 유형을 선택해주세요." />
            </SelectTrigger>
            <SelectContent>
              {postTypeOptions.map(({ value, label }) => (
                <SelectItem
                  key={value}
                  value={String(value)}
                  className="typo-body-2-regular"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Label
            className="typo-body-2-medium text-[var(--color-text-secondary)]"
            htmlFor="description"
          >
            간단히 덧붙이고 싶은 설명이 있다면
          </Label>
          <Textarea
            id="description"
            className="typo-body-2-regular focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
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
