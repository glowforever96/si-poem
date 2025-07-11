import TimerSection from "@/components/home/timer-section";
import UserHistory from "@/components/home/user-history";
import { auth } from "@/auth";
import UserHistoryGuest from "@/components/home/user-history-guest";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="w-full h-full flex flex-col p-5 min-h-0 flex-1">
      <TimerSection />
      {session ? (
        <UserHistory userId={session?.user.id as string} />
      ) : (
        <UserHistoryGuest />
      )}
    </div>
  );
}
