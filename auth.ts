import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { updateUser } from "./data/updateUser";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account }) {
      await updateUser({
        email: user.email!,
        nickname: "",
        image: user.image ?? "",
        provider: account?.provider ?? "",
      });
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      const dbUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, session.user.email));

      if (dbUser.length > 0) {
        session.user.id = dbUser[0].id.toString();
        session.user.nickname = dbUser[0].nickname ?? "";
      } else {
        session.user.nickname = "";
      }
      session.user.provider = token.provider as string;
      return session;
    },
  },
});
