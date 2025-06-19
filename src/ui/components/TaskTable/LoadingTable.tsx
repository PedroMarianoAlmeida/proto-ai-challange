import { Table } from "@/ui/components/Table";
import { SkeletonText } from "@/ui/components/SkeletonText";
import { Button } from "@/ui/components/Button";
import { FeatherEdit2, FeatherTrash } from "@subframe/core";

export const LoadingTable = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Table.Row
          key={index}
          className="grid w-full grid-cols-[minmax(0,15%),minmax(0,45%),minmax(0,10%),minmax(0,10%),minmax(0,10%)]"
        >
          <Table.Cell>
            <SkeletonText className="w-[120px]" />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText className="w-[200px]" />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText className="w-[100px]" />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText className="w-[120px]" />
          </Table.Cell>
          <Table.Cell>
            <div className="flex grow shrink-0 basis-0 items-center gap-2">
              <Button
                icon={<FeatherEdit2 />}
                variant="neutral-primary"
                disabled
              >
                Edit Task
              </Button>
              <Button
                icon={<FeatherTrash />}
                variant="destructive-primary"
                disabled
              >
                Delete
              </Button>
            </div>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};
