import { useQuery } from "@tanstack/react-query";

import background from "@/assets/undraw_completed_tasks.svg";
import { findAllTasks } from "@/services/api/tasks";
import { Skeleton } from "@/components/ui/skeleton";
import { TodoItem } from "./todo-item";

export function TodoList() {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: findAllTasks,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => {
          return <Skeleton key={i} className="h-16 w-full rounded-xl" />;
        })}
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <div className="flex flex-col justify-center items-center gap-6">
        <h2 className="font-semibold text-2xl">
          Você ainda não tem tarefas para concluir.
        </h2>
        <img src={background} alt="tarefas completas" width={480} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks?.map((task, i) => (
        <TodoItem key={i} task={task} />
      ))}
    </div>
  );
}
