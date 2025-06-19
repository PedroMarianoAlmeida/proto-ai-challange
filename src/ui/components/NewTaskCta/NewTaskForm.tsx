"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { useCreateTask } from "@/hooks/useMockTasks";

type Inputs = {
  title: string;
  description: string;
};

interface NewTasksFormProps {
  children: React.ReactNode;
  onSuccess(): void;
}
export const NewTaskForm = ({ children, onSuccess }: NewTasksFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate, isPending } = useCreateTask();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data, {
      onSuccess: () => {
        onSuccess();
        reset();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <div className="flex w-full flex-col items-start gap-6">
        <TextField
          className="h-auto w-full flex-none"
          label="Title"
          helpText={errors.title && "Title is required"}
          error={Boolean(errors.title)}
        >
          <TextField.Input
            placeholder="Enter task title"
            {...register("title", { required: true })}
          />
        </TextField>
        <TextArea
          className="h-auto w-full flex-none"
          label="Description"
          helpText={errors.description && "Description is required"}
          error={Boolean(errors.description)}
        >
          <TextArea.Input
            placeholder="Enter task description"
            {...register("description", { required: true })}
          />
        </TextArea>
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        {children}
        <Button type="submit" loading={isPending} disabled={isPending}>
          Create Task
        </Button>
      </div>
    </form>
  );
};
