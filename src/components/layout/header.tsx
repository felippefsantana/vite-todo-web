import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react";
import { CreateTaskDialog } from "../dialogs/create-task-dialog";
import { ModeToggle } from "../mode-toggle";

export function Header() {
  const [openNewTaskDialog, setOpenNewTaskDialog] = useState(false);

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-semibold">Minhas tarefas</h1>

      <div className="space-x-3">
        <ModeToggle />

        <Button onClick={() => setOpenNewTaskDialog(true)}>
          <Plus />
          Adicionar tarefa
        </Button>
        <CreateTaskDialog open={openNewTaskDialog} setOpen={setOpenNewTaskDialog} />
      </div>
    </header>
  );
}
