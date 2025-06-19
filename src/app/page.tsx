"use client";

import React from "react";

import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { FeatherSearch } from "@subframe/core";
import { FeatherChevronDown } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { NewTaskCta } from "@/ui/components/NewTaskCta";
import { useTasks } from "@/hooks/useMockTasks";
import { TaskRow } from "@/ui/components/TaskRow";

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
              {data && data.map((item) => <TaskRow item={item} />)}
            </Table>
          </div>
        </div>
      </DefaultPageLayout>
    </>
  );
}

export default TaskManagementHub;
