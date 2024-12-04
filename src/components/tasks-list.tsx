import { Task } from "@/types/Task";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteTask, findAllTasks } from "@/services/api/tasks";
import { AlertConfirmation } from "./alert-confirmation";
import { UpdateTaskDialog } from "./dialogs/update-task-dialog";

export function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const tasks = await findAllTasks();
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
  const [openDeleteAlertDialog, setOpenDeleteAlertDialog] = useState(false);
  const [openUpdateTaskDialog, setOpenUpdateTaskDialog] = useState(false);

  async function handleDeleteTask() {
    await deleteTask(task.id);
    setOpenDeleteAlertDialog(false);
  }

  return (
    <>
      <div className="border rounded-md px-3 py-2 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-lg">{task.title}</h2>

          <div className="space-x-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="text-amber-600 border-amber-300 hover:text-white hover:bg-amber-300 size-8"
                    onClick={() => setOpenUpdateTaskDialog(true)}
                  >
                    <Pencil />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Editar tarefa</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="text-red-600 border-red-600 hover:text-white hover:bg-red-600 size-8"
                    onClick={() => setOpenDeleteAlertDialog(true)}
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

      <AlertConfirmation
        open={openDeleteAlertDialog}
        setOpen={setOpenDeleteAlertDialog}
        confirmationAction={handleDeleteTask}
        message="Você está prestes a excluir esta tarefa. Esta ação é irreversível e não poderá ser desfeita. Tem certeza de que deseja continuar?"
      />
      <UpdateTaskDialog
        open={openUpdateTaskDialog}
        setOpen={setOpenUpdateTaskDialog}
        task={task}
      />
    </>
  );
}
