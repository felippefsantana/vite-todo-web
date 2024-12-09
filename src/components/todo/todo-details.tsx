import { findTaskById } from "@/services/api/tasks";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type TodoDetailsParams = {
  taskId: string;
};

// type TodoDetailsProps = {} & React.HTMLAttributes<HTMLDivElement>;

export function TodoDetails() {
  const { taskId } = useParams<TodoDetailsParams>();

  const { data: task, isLoading } = useQuery({
    queryKey: ["task"],
    queryFn: () => {
      if (!taskId) {
        throw new Error("Task ID is required");
      }

      return findTaskById(taskId);
    },
    enabled: !!taskId,
  });

  if (isLoading) {
    return <>carregando</>;
  }

  if (!task) {
    return null;
  }

  return <div className="px-5 py-4">task: {JSON.stringify(task)}</div>;
}
