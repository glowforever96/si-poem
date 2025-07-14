"use client";
import { UserHistory } from "@/types/histories";
import HistoryCardSection from "./history-card-section";

interface UserHistoryClientProps {
  history: UserHistory[];
}

export default function UserHistoryClient({ history }: UserHistoryClientProps) {
  return <HistoryCardSection history={history} isGuest={false} />;
}
