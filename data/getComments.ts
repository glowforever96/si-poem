"use server";

export async function getComments(postId: string) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/comment?postId=${postId}`,
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
