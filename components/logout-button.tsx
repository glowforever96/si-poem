"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      variant="link"
      className="cursor-pointer text-gray-400 text-sm"
    >
      로그아웃
    </Button>
  );
}
