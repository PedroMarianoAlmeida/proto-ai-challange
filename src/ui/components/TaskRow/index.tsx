import { Task } from "@/hooks/useMockTasks";
import { Table } from "@/ui/components/Table";
import { Badge } from "@/ui/components/Badge";

import { DeleteTask } from "./DeleteTask";
import { EditTask } from "./EditTask";

const statusToVariant: Record<string, "neutral" | "warning" | "success"> = {
  Todo: "neutral",
  "In Progress": "warning",
  Completed: "success",
};
export const TaskRow = ({ item }: { item: Task }) => {
  const { id, title, description, status, dueDate } = item;
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
        <div className="flex grow shrink-0 basis-0 items-center gap-2">
          <EditTask task={item} />
          <DeleteTask taskId={id} />
        </div>
      </Table.Cell>
    </Table.Row>
  );
};
