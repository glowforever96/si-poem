import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      nickname: string;
      provider: string;
    } & DefaultSession["user"];
  }
}
