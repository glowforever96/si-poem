"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleIcon from "/public/google-logo.svg";
import KakaoIcon from "/public/kakao-logo.svg";

export default function LoginButtons() {
  const router = useRouter();

  const startNotLoggedIn = () => {
    router.push("/home");
  };

  return (
    <div className="flex flex-col gap-4 text-md mb-12 z-20 text-[var(--color-text-secondary)]">
      <button
        onClick={() => signIn("kakao", { callbackUrl: "/home" })}
        className="bg-[var(--color-bg-primary-yellow)] px-4 py-2 rounded-full font-semibold cursor-pointer h-[48px] relative"
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <KakaoIcon />
        </div>
        카카오로 시작하기
      </button>
      <button
        className="bg-white px-4 py-2 rounded-full font-semibold cursor-pointer h-[48px] relative"
        onClick={() => signIn("google", { callbackUrl: "/home" })}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <GoogleIcon />
        </div>
        Google로 시작하기
      </button>
      <button
        className="bg-white px-4 py-2 rounded-full font-semibold cursor-pointer h-[48px]"
        onClick={startNotLoggedIn}
      >
        로그인 없이 시작하기
      </button>
    </div>
  );
}
