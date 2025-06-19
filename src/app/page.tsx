"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";

import { TextField } from "@/ui/components/TextField";
import { FeatherSearch } from "@subframe/core";
import { FeatherChevronDown } from "@subframe/core";

import { Table } from "@/ui/components/Table";
import { Badge } from "@/ui/components/Badge";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { FeatherEdit2 } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherMoreHorizontal } from "@subframe/core";

import { NewTaskCta } from "@/ui/components/NewTaskCta";
import { useTasks } from "@/hooks/useMockTasks";

const statusToVariant: Record<string, "neutral" | "warning" | "success"> = {
  Todo: "neutral",
  "In Progress": "warning",
  Completed: "success",
};

function TaskManagementHub() {
  const { data } = useTasks();
  return (
    <>
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-6">
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Tasks
            </span>
            <NewTaskCta />
          </div>
          <div className="flex w-full flex-wrap items-center gap-4">
            <div className="flex grow shrink-0 basis-0 items-center gap-2">
              <TextField
                variant="filled"
                label=""
                helpText=""
                icon={<FeatherSearch />}
              >
                <TextField.Input
                  placeholder="Search tasks..."
                  value=""
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                />
              </TextField>
              <Button
                variant="neutral-tertiary"
                iconRight={<FeatherChevronDown />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                All Status
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background shadow-sm overflow-auto">
            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Due Date</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.HeaderRow>
              }
            >
              {data &&
                data.map(({ description, dueDate, id, status, title }) => (
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
                      <Badge variant={statusToVariant[status] || "neutral"}>
                        {status}
                      </Badge>
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
                              onClick={(
                                event: React.MouseEvent<HTMLButtonElement>
                              ) => {}}
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
                                <DropdownMenu.DropdownItem
                                  icon={<FeatherEdit2 />}
                                >
                                  Edit
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem
                                  icon={<FeatherTrash />}
                                >
                                  Delete
                                </DropdownMenu.DropdownItem>
                              </DropdownMenu>
                            </SubframeCore.DropdownMenu.Content>
                          </SubframeCore.DropdownMenu.Portal>
                        </SubframeCore.DropdownMenu.Root>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table>
          </div>
        </div>
      </DefaultPageLayout>
    </>
  );
}

export default TaskManagementHub;
