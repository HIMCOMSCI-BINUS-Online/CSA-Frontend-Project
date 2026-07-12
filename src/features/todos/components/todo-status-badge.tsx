import { cn } from "@/utils/cn";
import type { TodoPriority, TodoStatus } from "../types";
import { priorityClass, priorityLabel, statusClass, statusLabel } from "../utils/todo-display";

export function TodoStatusBadge({ status }: { status: TodoStatus }) {
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", statusClass[status])}>
      {statusLabel[status]}
    </span>
  );
}

export function TodoPriorityBadge({ priority }: { priority: TodoPriority }) {
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", priorityClass[priority])}>
      {priorityLabel[priority]}
    </span>
  );
}
