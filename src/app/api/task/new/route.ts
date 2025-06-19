import { NextResponse } from "next/server";
import { getData, setData } from "@/data/tasks";
import { Task } from "@/types/task";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { title, description, dueDate } = await request.json();

  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required." },
      { status: 400 }
    );
  }

  const newTask: Task = {
    id: `${Date.now()}`,
    title,
    description,
    dueDate,
    status: "Todo",
  };

  const tasks = await getData();
  tasks.push(newTask);
  await setData(tasks);

  return NextResponse.json(newTask, { status: 201 });
}
