"use server";
export async function getUserHistory(userId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/history/${userId}`, {
    next: {
      tags: ["history"],
    },
    credentials: "include",
  });

  const history = await res.json();
  return history;
}
