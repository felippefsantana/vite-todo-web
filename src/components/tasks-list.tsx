import { Task } from "@/types/Task";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/tasks"
      );
      const tasks = await response.json();
      setTasks(tasks);
    }

    fetchTasks();
  }, []);

  return (
    <div className="space-y-3">
      {tasks.length > 0 &&
        tasks.map((task) => <TaskListItem key={task.id} task={task} />)}
    </div>
  );
}

type TaskListItemProps = {
  task: Task;
};

function TaskListItem({ task }: TaskListItemProps) {
  async function handleDeleteTask(taskId: string) {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
  }

  return (
    <div className="border rounded-md p-2 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-lg">{task.title}</h2>

        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="text-red-600 border-red-300 hover:text-red-800 size-8"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <Trash2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Excluir tarefa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <p className="text-sm">{task.description}</p>
    </div>
  );
}
