"use client";

import HistoryCardSection from "./history-card-section";
import { History } from "@/stores/useGuestHistoryStore";

interface UserHistoryClientProps {
  history: History[];
}

export default function UserHistoryClient({ history }: UserHistoryClientProps) {
  return <HistoryCardSection history={history} isGuest={false} />;
}
