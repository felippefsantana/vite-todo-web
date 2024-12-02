export type Task = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  completedAt: Date | null;
};