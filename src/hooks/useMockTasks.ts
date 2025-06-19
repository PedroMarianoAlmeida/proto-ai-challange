import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Completed";
  dueDate: string;
};

export const mockTasks: Task[] = [
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

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      await wait(300);
      return mockTasks;
    },
  });
};

interface CreateTaskParams {
  title: string;
  description: string;
}
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, description }: CreateTaskParams) => {
      await wait(300);
      console.log("before push");
      const newTask: Task = {
        id: `${Date.now()}`, // Better ID than Date string
        title,
        description,
        dueDate: new Date().toISOString().split("T")[0], // yyyy-mm-dd
        status: "Todo",
      };
      mockTasks.push(newTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
