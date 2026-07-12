import type { TodoPriority, TodoStatus } from "../types";

export const priorityLabel: Record<TodoPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const statusLabel: Record<TodoStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};

export const priorityClass: Record<TodoPriority, string> = {
  low: "bg-emerald-100 text-emerald-800",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-red-100 text-red-800",
};

export const statusClass: Record<TodoStatus, string> = {
  pending: "bg-surface-container text-on-surface",
  in_progress: "bg-secondary/10 text-secondary",
  completed: "bg-tertiary/10 text-tertiary",
};

export const formatDueDate = (value: string) => {
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};
