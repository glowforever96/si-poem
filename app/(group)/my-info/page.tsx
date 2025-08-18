import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";
import ProfileImageUpload from "@/components/ui/profile-image-upload";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { getUserRewardInfo } from "@/data/getUserRewardInfo";
import Stamp from "@/components/my-info/stamp";

export default async function MyInfoPage() {
  const session = await auth();

  const { totalPoints, historyCount } = await getUserRewardInfo(
    Number(session?.user.id)
  );

  const stampsFilled =
    historyCount % 10 === 0 && historyCount !== 0 ? 10 : historyCount % 10;
  const stamps = Array.from({ length: 10 }, (_, i) => i < stampsFilled);

  return (
    <div className="flex flex-col p-4 pb-[9rem]">
      <div className="mb-8">
        <h1 className="typo-heading-2-bold mb-2">내 정보</h1>
      </div>
      <div className="flex w-full gap-4 mb-10">
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
      <div className="w-full border border-gray-200 p-3 rounded-2xl flex flex-col gap-4 mb-3">
        <div className="flex justify-between items-center">
          <div className="flex justify-center gap-2 items-center">
            <p className="typo-body-1-bold">내 포인트</p>
            <span className="typo-heading-3-bold">{totalPoints}P</span>
          </div>
          <Link
            href="/my-info/point-info"
            className="typo-body-2-regular text-gray-500 flex items-center cursor-pointer"
          >
            포인트 내역 <ChevronRightIcon />
          </Link>
        </div>
      </div>
      <div className="w-full border border-gray-200 p-4 rounded-2xl flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <p className="typo-body-1-bold">내 리워드</p>
            <span className="typo-heading-3-bold">{historyCount}개</span>
          </div>
          <span className="typo-caption text-gray-400">
            도장이 10개가 넘으면 도장판이 초기화 되요.
          </span>
        </div>
        <div className="w-full border border-gray-200 p-3 rounded-2xl grid grid-cols-5 gap-3 place-items-center">
          {stamps.map((filled, index) => (
            <Stamp key={index} filled={filled} />
          ))}
        </div>
        <span className="typo-caption text-gray-500">
          작업 기록 하나당 리워드 한개가 적립됩니다.
        </span>
      </div>
      <div className="flex justify-end mt-4">
        <LogoutButton />
      </div>
    </div>
  );
}
