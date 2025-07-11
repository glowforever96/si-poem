import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";

export default async function MyInfoPage() {
  const session = await auth();

  return (
    <div className="flex flex-col h-screen">
      <div>{session?.user.provider} 로그인</div>
      <div>{session?.user.nickname}</div>

      <LogoutButton />
    </div>
  );
}
