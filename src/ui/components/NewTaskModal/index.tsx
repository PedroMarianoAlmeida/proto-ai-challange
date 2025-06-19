"use client";

import React from "react";
import { DialogLayout } from "@/ui/layouts/DialogLayout";
import { Button } from "@/ui/components/Button";
import { FeatherX } from "@subframe/core";
import { NewTaskForm } from "./NewTaskForm";
interface NewTaskModalProps {
  isOpen: boolean;
}
export function NewTaskModal({ isOpen }: NewTaskModalProps) {
  return (
    <DialogLayout open={isOpen} onOpenChange={() => {}}>
      <div className="flex h-full w-full min-w-[448px] flex-col items-start gap-6 bg-default-background px-6 py-6">
        <div className="flex w-full items-center justify-between">
          <span className="text-heading-2 font-heading-2 text-default-font">
            New Task
          </span>
          <Button
            variant="neutral-tertiary"
            icon={<FeatherX />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          />
        </div>
        <NewTaskForm>
          <Button
            variant="neutral-tertiary"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Cancel
          </Button>
        </NewTaskForm>
      </div>
    </DialogLayout>
  );
}
