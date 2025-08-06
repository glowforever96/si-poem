import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      nickname: string;
      image?: string;
      createdAt: string;
      provider: string;
    } & DefaultSession["user"];
  }
}
