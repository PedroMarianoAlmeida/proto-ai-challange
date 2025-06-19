import { NextResponse } from "next/server";
import data from "@/data/tasks.json";

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description } = body;

  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required." },
      { status: 400 }
    );
  }

  const newTask = {
    id: `${Date.now()}`,
    title,
    description,
    dueDate: new Date().toISOString().split("T")[0],
    status: "Todo",
  };

  data.push(newTask);

  return NextResponse.json(newTask, { status: 201 });
}
