import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/time";
import Link from "next/link";
import { auth } from "@/auth";
import WriteButton from "@/components/community/write-button";
import { getCommunityPosts } from "@/data/getCommunityPosts";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default async function CommunityPage() {
  const posts = await getCommunityPosts();
  const session = await auth();

  return (
    <div className="flex w-full flex-col pt-[16px] pr-[16px] pb-[6rem] pl-[16px]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="typo-heading-2-bold">커뮤니티</h1>
          <span className="typo-body-2-regular text-gray-500">
            나의 성장 기록을 공유해보세요!
          </span>
        </div>
        {session?.user ? (
          <Link href="/community/write">
            <Button>글쓰기</Button>
          </Link>
        ) : (
          <WriteButton />
        )}
      </div>
      <div className="flex flex-col">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-500">
                아직 작성된 글이 없습니다.
              </p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/community/${post.id}`}
              className="block"
            >
              <div className="flex flex-col gap-2 border-b border-gray-200 py-4">
                <p className="typo-body-1-medium">{post.title}</p>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                        <Image
                          priority
                          src={post.image as string}
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                          alt="유저 프로필 이미지"
                        />
                      </div>
                      <span className="typo-body-2-regular text-gray-800">
                        {post.userNickname && post.userNickname}
                      </span>
                    </div>
                    <span>•</span>
                    <span className="typo-body-2-regular text-gray-500">
                      {getRelativeTime(post.createdAt || new Date())}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChatBubbleIcon />
                    <span className="text-xs">{post.commentCount}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
