import { NextResponse } from "next/server";
import { getData, setData } from "@/data/tasks";
import { Task } from "@/types/task";

export const runtime = "nodejs";

export async function PUT(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;
  const { title, description, status, dueDate } = await request.json();

  const tasks = await getData();

  const idx = tasks.findIndex((t) => t.id === taskId);
  if (idx === -1) {
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }

  if (!title || !description || !status || !dueDate) {
    return NextResponse.json(
      {
        error:
          "Missing fields: title, description, status, and dueDate are required.",
      },
      { status: 400 }
    );
  }

  const updated: Task = {
    ...tasks[idx],
    title,
    description,
    status,
    dueDate,
  };
  tasks[idx] = updated;

  await setData(tasks);

  return NextResponse.json(updated, { status: 200 });
}
