import { NextResponse } from "next/server";
import data from "@/data/tasks.json";

export async function PUT(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;
  const body = await request.json();
  const { title, description, status, dueDate } = body;

  const task = data.find((t) => t.id === taskId);

  if (!task) {
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }

  if (!title || !description || !status || !dueDate) {
    return NextResponse.json(
      {
        error:
          "Missing fields. title, description, status, dueDate are required.",
      },
      { status: 400 }
    );
  }

  task.title = title;
  task.description = description;
  task.status = status;
  task.dueDate = dueDate;

  return NextResponse.json(task, { status: 200 });
}
