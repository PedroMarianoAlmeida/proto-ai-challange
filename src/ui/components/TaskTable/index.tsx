"use client";

import React from "react";
import { useDebounce } from "use-debounce";

import { TextField } from "@/ui/components/TextField";
import { FeatherSearch } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { TaskRow } from "@/src/ui/components/TaskTable/TaskRow";
import { useTasks } from "@/hooks/useMockTasks";
import { LoadingTable } from "./LoadingTable";

export const TaskTable = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const { data, isLoading } = useTasks(debouncedSearch);

  return (
    <>
      <div className="flex w-full flex-wrap items-center gap-4">
        <div className="flex grow shrink-0 basis-0 items-center gap-2">
          <TextField variant="filled" icon={<FeatherSearch />}>
            <TextField.Input
              placeholder="Search tasks..."
              value={searchInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearchInput(event.target.value)
              }
            />
          </TextField>
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
          {isLoading && <LoadingTable />}
          {data && data.map((item) => <TaskRow item={item} />)}
        </Table>
      </div>
    </>
  );
};
