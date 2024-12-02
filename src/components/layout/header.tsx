import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react";
import { CreateTaskDialog } from "../dialogs/create-task-dialog";

export function Header() {
  const [openNewTaskDialog, setOpenNewTaskDialog] = useState(false);

  return (
    <header className="flex justify-between items-center mb-5">
      <h1 className="text-2xl font-semibold">Minhas tarefas</h1>

      <Button onClick={() => setOpenNewTaskDialog(true)}>
        <Plus />
        Adicionar tarefa
      </Button>
      <CreateTaskDialog open={openNewTaskDialog} setOpen={setOpenNewTaskDialog} />
    </header>
  );
}
