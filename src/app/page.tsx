"use client";

import React from "react";

import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { CreateTask } from "@/src/ui/components/CreateTask";
import { TaskTable } from "@/ui/components/TaskTable";

function TaskManagementHub() {
  return (
    <>
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-6">
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Tasks
            </span>
            <CreateTask />
          </div>
          <TaskTable />
        </div>
      </DefaultPageLayout>
    </>
  );
}

export default TaskManagementHub;
