import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import LoginRequireDialog from "@/components/ui/login-require-dialog";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";

const suit = localFont({
  src: "../fonts/SUIT-Variable.ttf",
  variable: "--font-suit",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "si, poem: 오늘의 하루를 기록하세요.",
  description: "오늘의 하루를 기록하고 서로 응원하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suit.variable} font-suit`}>
        <main className="max-w-2xl w-full h-[100dvh] bg-[#ffffff] flex flex-col items-center relative">
          <SessionProvider>{children}</SessionProvider>
        </main>
        <LoginRequireDialog />
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
