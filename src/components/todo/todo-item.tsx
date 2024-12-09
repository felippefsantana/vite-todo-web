import { useState } from "react";
import { Task } from "@/types/Task";
import { Pencil, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { completeTask, deleteTask } from "@/services/api/tasks";
import { AlertConfirmation } from "@/components/alert-confirmation";
import { UpdateTaskDialog } from "@/components/dialogs/update-task-dialog";
import { Checkbox } from "@/components/ui/checkbox";

type TodoItemProps = {
  task: Task;
};

export function TodoItem({ task }: TodoItemProps) {
  const queryClient = useQueryClient();
  const [openDeleteAlertDialog, setOpenDeleteAlertDialog] = useState(false);
  const [openUpdateTaskDialog, setOpenUpdateTaskDialog] = useState(false);

  const { mutateAsync: completeTaskFn } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { isCompleted: boolean };
    }) => completeTask(id, { isCompleted: data.isCompleted }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutateAsync: deleteTaskFn } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  async function handleCompleteTask(isCompleted: boolean) {
    await completeTaskFn({ id: task.id, data: { isCompleted } });
  }

  async function handleDeleteTask() {
    await deleteTaskFn(task.id);
    setOpenDeleteAlertDialog(false);
  }

  return (
    <>
      <div className="border rounded-md px-3 py-2 shadow-sm">
        <div className="flex gap-3 relative">
          <div className="absolute top-4">
            <Checkbox
              className="rounded-full size-5"
              checked={task.isCompleted}
              onCheckedChange={handleCompleteTask}
            />
          </div>

          <div className="flex-1 ml-9">
            <div className="flex gap-3">
              <div className="flex-1">
                <h2
                  className={cn(
                    "font-medium text-lg",
                    task.isCompleted && "line-through"
                  )}
                >
                  {task.title}
                </h2>
                {task.description && (
                  <div>
                    <p className="text-sm peer">{task.description}</p>
                    {/* <span className="absolute bottom-0 h-6 w-full z-10 bg-gradient-to-t from-white dark:from-neutral-950"></span> */}
                  </div>
                )}

                <div className="mt-2 space-x-5">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Criada em:{" "}
                    {format(task.createdAt, "PPP HH:mm:ss", { locale: ptBR })}
                  </span>

                  {task.isCompleted && task.completedAt && (
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Concluída em:{" "}
                      {format(task.completedAt, "PPP HH:mm:ss", {
                        locale: ptBR,
                      })}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-x-3 shrink-0">
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
          </div>
        </div>
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
