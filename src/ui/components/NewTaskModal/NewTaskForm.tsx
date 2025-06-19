"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";

type Inputs = {
  title: string;
  description: string;
};

export const NewTaskForm = ({ children }: { children: React.ReactNode }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <div className="flex w-full flex-col items-start gap-6">
        <TextField
          className="h-auto w-full flex-none"
          label="Title"
          helpText=""
        >
          <TextField.Input
            placeholder="Enter task title"
            {...register("title", { required: true })}
          />
        </TextField>
        <TextArea
          className="h-auto w-full flex-none"
          label="Description"
          helpText=""
        >
          <TextArea.Input
            placeholder="Enter task description"
            {...register("description", { required: true })}
          />
        </TextArea>
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        {children}
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  );
};
