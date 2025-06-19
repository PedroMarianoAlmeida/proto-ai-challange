import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { FeatherTrash } from "@subframe/core";

export const DeleteTask = ({ taskId }: { taskId: string }) => {
  return (
    <DropdownMenu.DropdownItem icon={<FeatherTrash />}>
      Delete
    </DropdownMenu.DropdownItem>
  );
};
