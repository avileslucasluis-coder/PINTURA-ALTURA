import { ProjectData } from "@/data/projects";

function hash(value: string): number {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

export function rotateProjects(projects: ProjectData[], date = new Date()): ProjectData[] {
  const day = date.toISOString().slice(0, 10);
  return [...projects].sort((a, b) => hash(`${day}:${a.id}`) - hash(`${day}:${b.id}`));
}