"use client";
import Layout from "@/components/layout";
import NicknameDialog from "@/components/ui/nickname-dialog";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.nickname) {
      setOpen(true);
    }
  }, [session, status]);
  return (
    <Layout>
      {children}
      <NicknameDialog open={open} onClose={handleClose} />
    </Layout>
  );
}
