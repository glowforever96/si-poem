import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";
import Google from "next-auth/providers/google";
import { updateUser } from "./data/updateUser";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Kakao],
  callbacks: {
    async signIn({ user, account }) {
      await updateUser({
        email: user.email ?? null,
        nickname: null,
        image: user.image ?? "",
        providerId: account?.providerAccountId ?? "",
        provider: account?.provider ?? "",
      });
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
        token.providerId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      let dbUser;

      if (token.provider === "kakao") {
        dbUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.providerId, token.providerId as string));
      } else {
        dbUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, session.user.email));
      }

      if (dbUser.length > 0) {
        session.user.id = dbUser[0].id.toString();
        session.user.nickname = dbUser[0].nickname ?? "";
        session.user.image = dbUser[0].image ?? "";
        session.user.createdAt = dbUser[0].createdAt
          ? dayjs(dbUser[0].createdAt).tz("Asia/Seoul").format("YYYY년 M월 D일")
          : "";
      }
      session.user.provider = token.provider as string;
      return session;
    },
  },
});
