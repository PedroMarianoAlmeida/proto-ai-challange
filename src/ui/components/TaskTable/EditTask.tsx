"use client";

import React, { useState } from "react";
import { Task } from "@/types/task";

import { DialogLayout } from "@/ui/layouts/DialogLayout";
import { Button } from "@/ui/components/Button";
import { FeatherX, FeatherEdit2 } from "@subframe/core";
import { EditTaskForm } from "./EditTaskForm";

export function EditTask({ task }: { task: Task }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        icon={<FeatherEdit2 />}
        variant="neutral-primary"
        onClick={() => setIsModalOpen(true)}
      >
        Edit Task
      </Button>
      <DialogLayout open={isModalOpen} onOpenChange={() => {}}>
        <div className="flex h-full w-full min-w-[448px] flex-col items-start gap-6 bg-default-background px-6 py-6">
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Edit Task
            </span>
            <Button
              variant="neutral-tertiary"
              icon={<FeatherX />}
              onClick={() => setIsModalOpen(false)}
            />
          </div>
          <EditTaskForm onSuccess={() => setIsModalOpen(false)} task={task}>
            <Button
              variant="neutral-tertiary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </EditTaskForm>
        </div>
      </DialogLayout>
    </>
  );
}
