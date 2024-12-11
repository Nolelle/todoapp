export interface Todo {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: number;
  dueDate?: Date;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
