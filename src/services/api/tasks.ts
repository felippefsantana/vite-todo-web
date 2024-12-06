import { api } from "@/lib/axios";
import { TaskFormData } from "@/schemas/task";
import { Task } from "@/types/Task";

export async function createTask(data: TaskFormData) {
  await api.post("/tasks", data);
}

export async function findAllTasks(): Promise<Task[]> {
  const response = await api.get("/tasks");
  return response.data;
}

export async function updateTask(taskId: string, data: TaskFormData) {
  await api.patch(`/tasks/${taskId}`, data);
}

export async function completeTask(
  taskId: string,
  data: { isCompleted: boolean }
) {
  await api.patch(`/tasks/complete/${taskId}`, data);
}

export async function deleteTask(taskId: string) {
  await api.delete(`/tasks/${taskId}`);
}
