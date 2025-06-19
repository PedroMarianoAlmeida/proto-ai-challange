import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Task } from "@/types/task";

let mockTasks: Task[] = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Update the company website with new branding",
    status: "In Progress",
    dueDate: "2024-03-15",
  },
  {
    id: "2",
    title: "Product Launch",
    description: "Coordinate marketing campaign for new product",
    status: "Todo",
    dueDate: "2024-04-01",
  },
  {
    id: "3",
    title: "User Research",
    description: "Conduct user interviews and analyze feedback",
    status: "Completed",
    dueDate: "2024-03-10",
  },
];

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const useTasks = (search?: string) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", search],
    queryFn: async () => {
      const params = search ? `?search=${encodeURIComponent(search)}` : "";
      const res = await fetch(`/api/tasks${params}`);

      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }

      return res.json();
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      description,
      dueDate,
    }: Pick<Task, "description" | "title" | "dueDate">) => {
      const res = await fetch("/api/task/new", {
        method: "POST",
        body: JSON.stringify({ title, description, dueDate }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create task");
      }

      return res.json() as Promise<Task>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/task/delete/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedTask: Task) => {
      const res = await fetch(`/api/task/edit/${updatedTask.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      return res.json() as Promise<Task>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
