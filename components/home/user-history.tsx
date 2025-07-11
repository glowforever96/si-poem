import { getUserHistory } from "@/data/getUserHistory";
import HistoryCardSection from "./history-card-section";

export default async function UserHistory({ userId }: { userId: string }) {
  const history = await getUserHistory(userId);

  return <HistoryCardSection history={history} isGuest={false} />;
}
