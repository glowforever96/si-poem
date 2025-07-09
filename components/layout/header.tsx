"use client";
import { useLoginAlertlStore } from "@/stores/useLoginAlertStore";
import { ArrowLeftIcon, AvatarIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { open } = useLoginAlertlStore();

  const goToMyInfo = () => {
    if (!session) {
      open();
      return;
    }
    router.push("/myInfo");
  };

  return (
    <header className="w-full h-[54px] bg-[var(--color-bg-secondary)] flex items-center justify-between fixed top-0 z-10 max-w-2xl px-2">
      {pathname === "/myInfo" ? (
        <button
          className="w-[44px] h-[44px] flex items-center justify-center cursor-pointer [&_svg]:size-6"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon />
        </button>
      ) : (
        <div className="flex items-center text-[var(--color-text-primary)] font-semibold">
          <button
            className="w-[44px] h-[44px] flex items-center justify-center cursor-pointer"
            onClick={goToMyInfo}
          >
            <AvatarIcon width={24} height={24} />
          </button>
          {session?.user.nickname && `${session?.user.nickname} 님`}
        </div>
      )}
    </header>
  );
}
