export interface UserHistory {
  id: number;
  userId: number;
  task: string;
  description: string;
  start: Date;
  end: Date;
  type: number;
  duration: number;
  dateString: string;
}

export interface GuestHistory {
  task: string;
  description: string;
  start: Date;
  end: Date;
  type: number;
  duration: number;
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  parentId: number | null;
  createdAt: string;
  likes: number;
  liked: boolean;
  isMine: boolean;
  userNickname: string;
  image: string | null;
}

export const POST_TYPE_LABEL: Record<number, string> = {
  1: "공부",
  2: "자격증",
  3: "코딩",
  4: "운동",
  5: "루틴",
  6: "작심일기",
  7: "감정기록",
  8: "일상",
  9: "기타",
};
