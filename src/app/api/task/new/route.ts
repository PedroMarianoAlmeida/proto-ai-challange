import { NextResponse } from "next/server";
import { getData, setData } from "@/data/tasks";
import { Task } from "@/types/task";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { title, description } = await request.json();

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
    dueDate: new Date().toISOString().split("T")[0],
    status: "Todo",
  };

  // load, append, write
  const tasks = await getData();
  tasks.push(newTask);
  await setData(tasks);

  return NextResponse.json(newTask, { status: 201 });
}
