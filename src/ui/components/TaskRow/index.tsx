import { useTasks } from "@/hooks/useMockTasks";

import { Task } from "@/hooks/useMockTasks";
import { Table } from "@/ui/components/Table";
import { Badge } from "@/ui/components/Badge";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { FeatherEdit2 } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherMoreHorizontal } from "@subframe/core";

import { DeleteTask } from "./DeleteTask";

const statusToVariant: Record<string, "neutral" | "warning" | "success"> = {
  Todo: "neutral",
  "In Progress": "warning",
  Completed: "success",
};
export const TaskRow = ({
  item: { id, title, description, status, dueDate },
}: {
  item: Task;
}) => {
  return (
    <Table.Row key={id}>
      <Table.Cell>
        <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
          {title}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="whitespace-nowrap text-body font-body text-neutral-500">
          {description}
        </span>
      </Table.Cell>
      <Table.Cell>
        <Badge variant={statusToVariant[status] || "neutral"}>{status}</Badge>
      </Table.Cell>
      <Table.Cell>
        <span className="whitespace-nowrap text-body font-body text-neutral-500">
          {new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(new Date(dueDate))}
        </span>
      </Table.Cell>
      <Table.Cell>
        <div className="flex grow shrink-0 basis-0 items-center">
          <SubframeCore.DropdownMenu.Root>
            <SubframeCore.DropdownMenu.Trigger asChild={true}>
              <IconButton
                icon={<FeatherMoreHorizontal />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
            </SubframeCore.DropdownMenu.Trigger>
            <SubframeCore.DropdownMenu.Portal>
              <SubframeCore.DropdownMenu.Content
                side="bottom"
                align="end"
                sideOffset={8}
                asChild={true}
              >
                <DropdownMenu>
                  <DropdownMenu.DropdownItem icon={<FeatherEdit2 />}>
                    Edit
                  </DropdownMenu.DropdownItem>
                  <DeleteTask taskId={id} />
                </DropdownMenu>
              </SubframeCore.DropdownMenu.Content>
            </SubframeCore.DropdownMenu.Portal>
          </SubframeCore.DropdownMenu.Root>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};
