"use server";

export async function createCommunityPost(data: {
  userId: number;
  historyId: number;
  title: string;
  content: string;
}) {
  const res = await fetch(`${process.env.BASE_URL}/api/community`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const result = await res.json();
  return result;
}
