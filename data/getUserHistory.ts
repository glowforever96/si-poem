"use server";
// 사용자 오늘 히스토리 조회
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

// 사용자 모든 히스토리 조회
export async function getAllUserHistory(userId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/history/${userId}/all`, {
    next: {
      tags: ["history"],
    },
    credentials: "include",
  });

  const history = await res.json();
  return history;
}
