import { getAllUserHistory } from "@/data/getUserHistory";
import { auth } from "@/auth";
import WriteSection from "@/components/write/write-section";
import { redirect } from "next/navigation";

export default async function WritePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/community");
  }

  const history = await getAllUserHistory(session.user.id as string);

  return (
    <div className="flex w-full flex-col p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-2">글쓰기</h1>
        <p className="text-gray-600 text-sm">집중의 기록을 공유해보세요!</p>
      </div>
      <div className="pb-[100px]">
        <WriteSection history={history} />
      </div>
    </div>
  );
}
