"use server";

export async function getComments({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/comment?postId=${postId}${
      userId ? `&userId=${userId}` : ""
    }`,
    {
      next: {
        tags: ["comments"],
      },
      cache: "force-cache",
      credentials: "include",
    }
  );

  const comments = await res.json();

  return comments;
}
