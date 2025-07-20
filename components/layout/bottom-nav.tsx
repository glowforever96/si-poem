"use client";

import { BarChartIcon, ClockIcon, FaceIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="w-full h-[84px] bg-[var(--color-bg-secondary)] border-t-gray-150 border-t-[1px] fixed bottom-0 max-w-2xl z-10 pt-2">
      <ul className="mx-auto flex max-w-[500px] justify-between px-[52px] pt-2.5 text-[var(--color-text-gray-500)] font-semibold text-[12px]">
        <Link
          href="/chart"
          className={`flex items-center h-[46px] w-[48px] flex-col gap-1 [&_svg]:size-6
            ${
              pathname === "/chart"
                ? "text-[var(--color-text-primary)] font-bold"
                : "text-[var(--color-text-gray-500)]"
            } `}
        >
          <BarChartIcon />
          <span>차트</span>
        </Link>
        <Link
          href="/home"
          className={`flex items-center h-[46px] w-[48px] flex-col gap-1 [&_svg]:size-6
            ${
              pathname === "/home"
                ? "text-[var(--color-text-primary)] font-bold"
                : "text-[var(--color-text-gray-500)]"
            }`}
        >
          <ClockIcon />
          <span>작업</span>
        </Link>
        <Link
          href="/community"
          className={`flex items-center h-[46px] w-[48px] flex-col gap-1 [&_svg]:size-6
            ${
              pathname.includes("/community")
                ? "text-[var(--color-text-primary)] font-bold"
                : "text-[var(--color-text-gray-500)]"
            }`}
        >
          <FaceIcon />
          커뮤니티
        </Link>
      </ul>
    </div>
  );
}
