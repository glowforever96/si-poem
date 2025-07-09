import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";

export default async function MyInfoPage() {
  const session = await auth();

  return (
    <div>
      MyInfo
      {session?.user?.name}
      <LogoutButton />
    </div>
  );
}
