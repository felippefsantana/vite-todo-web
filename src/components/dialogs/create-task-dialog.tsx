import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "../forms/task-form";

type CreateTaskDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function CreateTaskDialog({ open, setOpen }: CreateTaskDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Adicione uma nova tarefa</DialogTitle>
        </DialogHeader>

        <TaskForm onCancel={() => setOpen(false)} onSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
