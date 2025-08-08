"use client";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

export default function FilterChips() {
  const searchParams = useSearchParams();
  const selectedType = Number(searchParams.get("type") ?? 0);
  return (
    <ScrollContainer
      className="flex gap-2 pt-2 px-1 pb-5 border-b border-gray-200"
      hideScrollbars
    >
      {linkData.map(({ title, href }, index) => (
        <Link
          href={href}
          key={title}
          className={clsx(
            "whitespace-nowrap rounded-full border px-4 py-1 typo-body-2-medium",
            selectedType === index
              ? "bg-[var(--color-purple-primary)] text-white border-transparent shadow"
              : "bg-white text-gray-600 border-gray-200"
          )}
        >
          {title}
        </Link>
      ))}
    </ScrollContainer>
  );
}

export const POST_TYPE = {
  ALL: 0,
  STUDY: 1,
  LICENSE: 2,
  CODING: 3,
  WORKOUT: 4,
  ROUTINE: 5,
  DIARY: 6,
  FEELING: 7,
  DAILY: 8,
  CHEER: 9,
} as const;

export type PostType = (typeof POST_TYPE)[keyof typeof POST_TYPE];

const linkData = [
  { title: "전체", href: `/community?type=${POST_TYPE.ALL}` },
  { title: "공부", href: `/community?type=${POST_TYPE.STUDY}` },
  { title: "자격증", href: `/community?type=${POST_TYPE.LICENSE}` },
  { title: "코딩", href: `/community?type=${POST_TYPE.CODING}` },
  { title: "운동", href: `/community?type=${POST_TYPE.WORKOUT}` },
  { title: "루틴", href: `/community?type=${POST_TYPE.ROUTINE}` },
  { title: "작심일기", href: `/community?type=${POST_TYPE.DIARY}` },
  { title: "감정기록", href: `/community?type=${POST_TYPE.FEELING}` },
  { title: "일상", href: `/community?type=${POST_TYPE.DAILY}` },
  { title: "기타", href: `/community?type=${POST_TYPE.CHEER}` },
];
