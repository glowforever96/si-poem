export interface UserHistory {
  id: number;
  userId: number;
  task: string;
  description: string;
  start: Date;
  end: Date;
  duration: number;
  dateString: string;
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  parentId: number | null;
  createdAt: string;
  image: string;
  userNickname: string | null;
}
