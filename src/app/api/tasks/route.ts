import { NextResponse } from "next/server";
import { getData } from "@/data/tasks";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const tasks = await getData();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase();

  const result = search
    ? tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
      )
    : tasks;

  return NextResponse.json(result);
}
