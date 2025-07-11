"use client";
import { useLoginAlertlStore } from "@/stores/useLoginAlertStore";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function LoginRequireDialog() {
  const { isOpen, close } = useLoginAlertlStore();
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-[75%] flex flex-col items-center !max-w-[320px]">
        <AlertDialogHeader>
          <AlertDialogTitle>로그인 하시고 전부 더 즐겨보세요!</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-center">
          로그인 하고 이용하시면
          <br /> 더 다양한 기능을 이용하실 수 있습니다.
        </AlertDialogDescription>
        <AlertDialogFooter className="flex w-full !flex-col gap-2">
          <Button
            className="cursor-pointer w-full bg-[var(--color-purple-primary)]"
            onClick={() => {
              router.push("/");
              close();
            }}
          >
            로그인
          </Button>
          <Button
            onClick={close}
            className="cursor-pointer w-full"
            variant="ghost"
          >
            닫기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
