import { promises as fs } from "fs";
import path from "path";
import { Task } from "@/types/task";

const filePath = path.join(process.cwd(), "src", "data", "tasks.json");

export async function getData(): Promise<Task[]> {
  const json = await fs.readFile(filePath, "utf8");
  return JSON.parse(json) as Task[];
}

export async function setData(tasks: Task[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), "utf8");
}
