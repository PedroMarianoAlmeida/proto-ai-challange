"use client";

import React from "react";
import { DialogLayout } from "@/ui/layouts/DialogLayout";
import { Button } from "@/ui/components/Button";
import { FeatherX } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";

function NewTaskModal() {
  return (
    <DialogLayout open={true} onOpenChange={() => {}}>
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
        <div className="flex w-full flex-col items-start gap-6">
          <TextField
            className="h-auto w-full flex-none"
            label="Title"
            helpText=""
          >
            <TextField.Input
              placeholder="Enter task title"
              value=""
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
            />
          </TextField>
          <TextArea
            className="h-auto w-full flex-none"
            label="Description"
            helpText=""
          >
            <TextArea.Input
              placeholder="Enter task description"
              value=""
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {}}
            />
          </TextArea>
        </div>
        <div className="flex w-full items-center justify-end gap-2">
          <Button
            variant="neutral-tertiary"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Cancel
          </Button>
          <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
            Create Task
          </Button>
        </div>
      </div>
    </DialogLayout>
  );
}

export default NewTaskModal;
