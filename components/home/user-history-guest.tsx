"use client";
import {
  GuestHistory,
  useGuestHistoryStore,
} from "@/stores/useGuestHistoryStore";
import { useEffect, useState } from "react";
import HistoryCardSection from "./history-card-section";
import SkeletonHistory from "../ui/skeleton-history";

export default function UserHistoryGuest() {
  const { history, createdDate, resetHistory } = useGuestHistoryStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    if (createdDate !== today) {
      resetHistory();
    }
    setIsLoading(true);
  }, [createdDate, resetHistory]);

  if (!isLoading) return <SkeletonHistory />;

  return <HistoryCardSection history={history as GuestHistory[]} isGuest />;
}
