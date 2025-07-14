"use client";
import { Session } from "next-auth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import TimerSection from "./timer-section";
import UserHistoryClient from "./user-history-client";
import UserHistoryGuest from "./user-history-guest";
import { GuestHistory } from "@/stores/useGuestHistoryStore";
import { UserHistory } from "@/types/histories";

import "swiper/css";
import "swiper/css/pagination";

interface SwipeableHomeProps {
  session: Session | null;
  initialHistory: UserHistory[] | GuestHistory[];
}

export default function SwipeableHome({
  session,
  initialHistory,
}: SwipeableHomeProps) {
  return (
    <div className="w-full h-[calc(100%-6rem)]">
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        loop={true}
        className="h-full"
        spaceBetween={0}
        slidesPerView={1}
        allowTouchMove={true}
        resistance={true}
        resistanceRatio={0.85}
      >
        <SwiperSlide>
          <div className="w-full h-full flex flex-col p-3 min-h-0 flex-1">
            <TimerSection />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex flex-col p-3 min-h-0 flex-1">
            {session ? (
              <UserHistoryClient history={initialHistory as UserHistory[]} />
            ) : (
              <UserHistoryGuest />
            )}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
