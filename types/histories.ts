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
