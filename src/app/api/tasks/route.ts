import { NextResponse } from "next/server";
import data from "@/data/tasks.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase();

  const result = search
    ? data.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
      )
    : data;

  return NextResponse.json(result);
}
