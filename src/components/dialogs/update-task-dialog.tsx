import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "../forms/task-form";
import { Task } from "@/types/Task";
import { AlertConfirmation } from "../alert-confirmation";
import { useState } from "react";

type UpdateTaskDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  task: Task;
};

export function UpdateTaskDialog({
  open,
  setOpen,
  task,
}: UpdateTaskDialogProps) {
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  function handleOpenChange() {
    const isTaskFormModified = localStorage.getItem("taskFormModified");
    console.log(isTaskFormModified)

    if (isTaskFormModified) {
      setShowExitConfirmation(true);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
        </DialogHeader>

        <TaskForm
          onCancel={() => setOpen(false)}
          onSave={() => setOpen(false)}
          task={task}
        />

        <AlertConfirmation
          open={showExitConfirmation}
          setOpen={setShowExitConfirmation}
          confirmationAction={() => setOpen(false)}
          title="Sair sem salvar?"
          message="Você tem alterações não salvas. Por favor, confirme que deseja sair sem salvar."
        />
      </DialogContent>
    </Dialog>
  );
}
