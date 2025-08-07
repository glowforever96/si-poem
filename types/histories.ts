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

export interface GuestHistory {
  task: string;
  description: string;
  start: Date;
  end: Date;
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
