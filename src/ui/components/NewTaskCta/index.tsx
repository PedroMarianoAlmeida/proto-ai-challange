"use client";

import React, { useState } from "react";
import { DialogLayout } from "@/ui/layouts/DialogLayout";
import { Button } from "@/ui/components/Button";
import { FeatherX, FeatherPlus } from "@subframe/core";
import { NewTaskForm } from "./NewTaskForm";

export function NewTaskCta() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Button icon={<FeatherPlus />} onClick={() => setIsModalOpen(true)}>
        New Task
      </Button>
      <DialogLayout open={isModalOpen} onOpenChange={() => {}}>
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
    </>
  );
}
