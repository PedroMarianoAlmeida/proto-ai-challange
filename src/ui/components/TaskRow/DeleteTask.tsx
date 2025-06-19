"use client";
import { Button } from "@/ui/components/Button";
import { FeatherTrash } from "@subframe/core";

import { useDeleteTask } from "@/hooks/useMockTasks";

export const DeleteTask = ({ taskId }: { taskId: string }) => {
  const { mutate, isPending } = useDeleteTask(taskId);

  const handleDelete = () => {
    mutate();
  };

  return (
    <Button
      icon={<FeatherTrash />}
      onClick={handleDelete}
      variant="destructive-primary"
      disabled={isPending}
      loading={isPending}
    >
      Delete
    </Button>
  );
};
