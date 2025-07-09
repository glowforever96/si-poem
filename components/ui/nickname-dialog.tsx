"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Button } from "./button";
import { Input } from "./input";
import { updateNickname } from "@/data/updateNickname";
import { useSession } from "next-auth/react";

interface NicknameDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function NicknameDialog({ open, onClose }: NicknameDialogProps) {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const { update } = useSession();

  const handleSubmit = async () => {
    if (!nickname || nickname.trim() === "") {
      setError("올바른 닉네임을 입력해주세요.");
      return;
    }
    const res = await updateNickname(nickname);
    if (!res?.ok) {
      setError(res.error || "");
      return;
    }
    await update();
    onClose();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="w-[80%]">
        <AlertDialogHeader>
          <AlertDialogTitle>사용하실 닉네임을 설정해주세요.</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요."
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
        <AlertDialogFooter className="flex w-full items-center">
          <Button onClick={handleSubmit} className="cursor-pointer w-full">
            확인
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
