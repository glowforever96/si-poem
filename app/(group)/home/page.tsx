import SwipeableHome from "@/components/home/swipeable-home";
import { auth } from "@/auth";
import { getUserHistory } from "@/data/getUserHistory";
import { History } from "@/stores/useGuestHistoryStore";

export default async function HomePage() {
  const session = await auth();
  let history: History[] = [];

  if (session?.user?.id) {
    history = await getUserHistory(session.user.id);
  }

  return <SwipeableHome session={session} initialHistory={history} />;
}
