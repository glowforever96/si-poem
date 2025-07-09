"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginButtons() {
  const router = useRouter();

  const startNotLoggedIn = () => {
    router.push("/home");
  };

  return (
    <div className="flex flex-col gap-4 text-md mb-12 z-20 text-[var(--color-text-secondary)]">
      <button className="bg-[var(--color-bg-primary-yellow)] px-4 py-2 rounded-full font-semibold cursor-pointer h-[44px]">
        카카오로 시작하기 (준비중)
      </button>
      <button
        className="bg-white px-4 py-2 rounded-full font-semibold cursor-pointer h-[44px]"
        onClick={() => signIn("google", { callbackUrl: "/home" })}
      >
        Google로 시작하기
      </button>
      <button
        className="bg-white px-4 py-2 rounded-full font-semibold cursor-pointer h-[44px]"
        onClick={startNotLoggedIn}
      >
        로그인 없이 시작하기
      </button>
    </div>
  );
}
