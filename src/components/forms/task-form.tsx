import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@/types/Task";

import { TaskFormData, taskFormSchema } from "@/schemas/task";
import { createTask } from "@/services/api/tasks";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

type TaskFormProps = {
  task?: Task;
  onCancel?: () => void;
  onSave?: () => void;
};

export function TaskForm({ onCancel, onSave, task }: TaskFormProps) {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description,
        }
      : {
          title: "",
          description: "",
        },
  });

  async function onSubmit(data: TaskFormData) {
    if (!task) {
      // create
      await createTask(data);
      form.reset();
      if (onSave) {
        onSave();
      }
    } else {
      // update
    }
  }

  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
  }

  useEffect(() => {
    localStorage.setItem("taskFormModified", form.formState.isDirty.toString());
  }, [form.formState.isDirty]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-3">
              <Label htmlFor="title">Título</Label>
              <FormControl>
                <Input
                  type="text"
                  id="title"
                  placeholder="Dê um título para a sua tarefa"
                  className={
                    form.formState.errors.title &&
                    "border-red-300 focus-visible:ring-red-600"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mb-3">
              <Label htmlFor="description">Descrição</Label>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Descreva o que será feito"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="space-x-3">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit">{!task ? "Criar" : "Salvar alterações"}</Button>
        </div>
      </form>
    </Form>
  );
}
