"use client";
import { Button } from "../ui/button";
import { useLoginAlertlStore } from "@/stores/useLoginAlertStore";

export default function WriteButton() {
  const { open } = useLoginAlertlStore();

  return <Button onClick={open}>글쓰기</Button>;
}
