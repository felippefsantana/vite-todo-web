import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@/types/Task";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type TaskFormProps = {
  task?: Task;
  onCancel?: () => void;
  onSave?: () => void;
};

const taskFormSchema = z.object({
  title: z.string().min(1, "Escreva um título.").trim(),
  description: z.string().trim(),
});

type TaskFormData = z.infer<typeof taskFormSchema>;

export function TaskForm({ onCancel, onSave, task }: TaskFormProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
  });

  async function onSubmit(data: TaskFormData) {
    await fetch(import.meta.env.VITE_API_BASE_URL + "/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    });
    reset();
    if (onSave) {
      onSave();
    }
  }

  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
  }

  useEffect(() => {
    localStorage.setItem("taskFormModified", isDirty.toString());
  }, [isDirty]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <Label htmlFor="title">Título</Label>
        <Input
          type="text"
          id="title"
          placeholder="Dê um título para a sua tarefa"
          className={
            errors.title && "border-red-300 focus-visible:ring-red-600"
          }
          {...register("title", { value: task?.title })}
        />
        {errors.title && (
          <span className="text-red-500 font-medium text-sm">
            {errors.title.message}
          </span>
        )}
      </div>

      <div className="mb-3">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Descreva o que será feito"
          {...register("description", { value: task?.description })}
        />
      </div>

      <div className="space-x-3">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button type="submit">{!task ? "Criar" : "Salvar alterações"}</Button>
      </div>
    </form>
  );
}
