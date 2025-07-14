import SwipeableHome from "@/components/home/swipeable-home";
import { auth } from "@/auth";
import { getUserHistory } from "@/data/getUserHistory";
import { GuestHistory } from "@/stores/useGuestHistoryStore";
import { UserHistory } from "@/types/histories";

export default async function HomePage() {
  const session = await auth();
  let history: UserHistory[] | GuestHistory[] = [];

  if (session?.user?.id) {
    history = await getUserHistory(session.user.id);
  }

  return <SwipeableHome session={session} initialHistory={history} />;
}
