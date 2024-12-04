import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@/types/Task";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TaskFormData, taskFormSchema } from "@/schemas/task";
import { createTask, updateTask } from "@/services/api/tasks";

import { Loader2 } from "lucide-react";
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
  const queryClient = useQueryClient();
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

  const { mutateAsync: createTaskFn } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    // onSuccess(_, variables) {
    //   const cached = queryClient.getQueryData(["tasks"]);

    //   queryClient.setQueryData(["tasks"], (data) => {
    //     return [
    //       ...data,
    //       {
    //         title: variables.title,
    //         description: variables.description,
    //       },
    //     ];
    //   });
    // },
  });

  const { mutateAsync: updateTaskFn } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TaskFormData }) =>
      updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  async function onSubmit(data: TaskFormData) {
    if (!task) {
      // create
      await createTaskFn(data);
      form.reset();
    } else {
      // update
      await updateTaskFn({ id: task.id, data });
    }

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
          {form.formState.isSubmitting ? (
            <Button type="button" disabled>
              <Loader2 className="animate-spin" />
              Aguarde
            </Button>
          ) : (
            <Button type="submit">
              {!task ? "Criar" : "Salvar alterações"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
