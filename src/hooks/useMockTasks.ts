import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "@/types/task";

// In-memory mock data
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

// Simulate network latency
const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const useTasks = (search?: string) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", search],
    queryFn: async () => {
      await wait(300);
      if (search) {
        const term = search.toLowerCase();
        return mockTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(term) ||
            task.description.toLowerCase().includes(term)
        );
      }
      return [...mockTasks];
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
    }: Pick<Task, "title" | "description" | "dueDate">) => {
      await wait(300);
      const newTask: Task = {
        id: `${Date.now()}`,
        title,
        description,
        dueDate,
        status: "Todo",
      };
      mockTasks.push(newTask);
      return newTask;
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
      await wait(300);
      const index = mockTasks.findIndex((t) => t.id === taskId);
      if (index === -1) throw new Error("Task not found");
      const [deleted] = mockTasks.splice(index, 1);
      return deleted;
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
      await wait(300);
      const idx = mockTasks.findIndex((t) => t.id === updatedTask.id);
      if (idx === -1) throw new Error("Task not found");
      mockTasks[idx] = { ...updatedTask };
      return mockTasks[idx];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
