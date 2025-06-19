"use client";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { FeatherTrash } from "@subframe/core";

import { useDeleteTask } from "@/hooks/useMockTasks";

export const DeleteTask = ({ taskId }: { taskId: string }) => {
  const { mutate, isPending } = useDeleteTask(taskId);

  const handleDelete = () => {
    mutate();
  };

  return (
    <DropdownMenu.DropdownItem icon={<FeatherTrash />} onClick={handleDelete}>
      Delete
    </DropdownMenu.DropdownItem>
  );
};
