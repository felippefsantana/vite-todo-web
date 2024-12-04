import { api } from "@/lib/axios";

export async function deleteTask(taskId: string) {
  await api.delete(`/tasks/${taskId}`);
}