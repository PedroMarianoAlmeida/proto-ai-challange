"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { useUpdateTask } from "@/hooks/useMockTasks";
import { Task } from "@/types/task";
import { Select } from "@/ui/components/Select";
import { Calendar } from "@/ui/components/Calendar";

type Inputs = {
  title: string;
  description: string;
  status: Task["status"];
  dueDate: Date;
};

interface EditTaskFormProps {
  children: React.ReactNode;
  onSuccess(): void;
  task: Task;
}
export const EditTaskForm = ({
  children,
  onSuccess,
  task,
}: EditTaskFormProps) => {
  const { description, dueDate, id, status, title } = task;

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title,
      description,
      status,
      dueDate: new Date(dueDate),
    },
  });

  useEffect(() => {
    reset({
      title,
      description,
      status,
      dueDate: new Date(task.dueDate),
    });
  }, [task, reset]);

  const watchedValues = watch();

  const isChanged =
    watchedValues.title !== title ||
    watchedValues.description !== description ||
    watchedValues.status !== status ||
    watchedValues.dueDate?.toDateString() !== new Date(dueDate).toDateString();

  const { mutate, isPending } = useUpdateTask();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(
      {
        id,
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate.toISOString().split("T")[0],
      },
      {
        onSuccess: () => {
          onSuccess();
          reset();
        },
      }
    );
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
        <Controller
          name="status"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              className="h-auto w-full flex-none"
              label="Status"
              placeholder="Select status"
              helpText={errors.status && "Status is required"}
              error={Boolean(errors.status)}
              value={field.value}
              onValueChange={field.onChange}
            >
              <Select.Item value="Todo">Todo</Select.Item>
              <Select.Item value="In Progress">In Progress</Select.Item>
              <Select.Item value="Completed">Completed</Select.Item>
            </Select>
          )}
        />
        <Controller
          name="dueDate"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="flex flex-col gap-1 w-full items-center">
              <span className="text-caption-bold font-caption-bold text-default-font w-full text-left">
                Due Date
              </span>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
              />
            </div>
          )}
        />
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        {children}
        <Button
          type="submit"
          loading={isPending}
          disabled={isPending || !isChanged}
        >
          Edit Task
        </Button>
      </div>
    </form>
  );
};
