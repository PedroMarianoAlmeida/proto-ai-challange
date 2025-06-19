import { NextResponse } from "next/server";
import { getData, setData } from "@/data/tasks";

export const runtime = "nodejs";

export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;

  const tasks = await getData();

  const index = tasks.findIndex((t) => t.id === taskId);
  if (index === -1) {
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }
  const [deletedTask] = tasks.splice(index, 1);

  await setData(tasks);

  return NextResponse.json(deletedTask, { status: 200 });
}
