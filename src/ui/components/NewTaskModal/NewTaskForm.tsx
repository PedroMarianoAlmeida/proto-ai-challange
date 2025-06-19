"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export const NewTaskForm = ({ children }: { children: React.ReactNode }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col items-start gap-6">
        <TextField
          className="h-auto w-full flex-none"
          label="Title"
          helpText=""
        >
          <TextField.Input
            placeholder="Enter task title"
            {...register("example")}
          />
        </TextField>
        <TextArea
          className="h-auto w-full flex-none"
          label="Description"
          helpText=""
        >
          <TextArea.Input
            placeholder="Enter task description"
            {...register("exampleRequired", { required: true })}
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
