"use client";

import React from "react";

import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";

export const NewTaskForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
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
        {children}
        <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
          Create Task
        </Button>
      </div>
    </>
  );
};
