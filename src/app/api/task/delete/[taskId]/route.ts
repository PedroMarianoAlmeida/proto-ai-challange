import { NextResponse } from "next/server";
import data from "@/data/tasks.json";

export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;

  const index = data.findIndex((task) => task.id === taskId);

  if (index === -1) {
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }

  const deletedTask = data.splice(index, 1)[0];

  return NextResponse.json(deletedTask, { status: 200 });
}
