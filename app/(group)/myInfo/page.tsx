import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";
import ProfileImageUpload from "@/components/ui/profile-image-upload";

export default async function MyInfoPage() {
  const session = await auth();

  return (
    <div className="flex flex-col p-4 h-[calc(100dvh-9rem)]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">내 정보</h1>
      </div>
      <div className="flex w-full gap-3">
        <ProfileImageUpload currentImageUrl={session?.user.image || null} />
        <div className="flex flex-col gap-2">
          <div className="text-sm text-gray-500">
            {session?.user.provider} 로그인
          </div>
          <div className="text-2xl font-bold">{session?.user.nickname}</div>
          {session?.user.email && (
            <div className="text-sm text-gray-500">{session?.user.email}</div>
          )}
          <div className="text-sm text-gray-500">
            가입 {session?.user.createdAt}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-auto">
        <LogoutButton />
      </div>
    </div>
  );
}
