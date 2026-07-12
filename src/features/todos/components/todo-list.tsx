import { Link } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { paths } from "@/config/paths";
import { cn } from "@/utils/cn";
import type { Todo } from "../types";
import { formatDueDate } from "../utils/todo-display";
import { TodoPriorityBadge, TodoStatusBadge } from "./todo-status-badge";

type TodoListProps = {
  todos: Todo[] | undefined;
  isLoading: boolean;
  isError: boolean;
  emptyMessage?: string;
  showRestore?: boolean;
  onRestore?: (id: number) => void;
  restoringId?: number | null;
};

export function TodoList({
  todos,
  isLoading,
  isError,
  emptyMessage = "No tasks found.",
  showRestore,
  onRestore,
  restoringId,
}: TodoListProps) {
  if (isLoading)
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  if (isError)
    return (
      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">Failed to load tasks.</div>
    );
  if (!todos?.length)
    return (
      <div className="rounded-xl border border-dashed border-surface-container p-12 text-center text-on-surface-variant">
        {emptyMessage}
      </div>
    );

  return (
    <div className="overflow-hidden rounded-xl border border-surface-container bg-white shadow-sm">
      <ul className="divide-y divide-surface-container-low">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div className="min-w-0 flex-1">
              <Link
                to={paths.app.todoDetail.getHref(todo.id)}
                className="font-headline text-lg font-semibold text-on-surface hover:text-secondary"
              >
                {todo.title}
              </Link>
              {todo.description ? (
                <p className="mt-1 line-clamp-2 text-sm text-on-surface-variant">
                  {todo.description}
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <TodoStatusBadge status={todo.status} />
                <TodoPriorityBadge priority={todo.priority} />
                <span className="text-xs text-on-surface-variant">
                  Due {formatDueDate(todo.dueDate)}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              {showRestore ? (
                <button
                  type="button"
                  disabled={restoringId === todo.id}
                  onClick={() => onRestore?.(todo.id)}
                  className={cn(
                    "rounded-lg border border-secondary px-4 py-2 text-sm font-semibold text-secondary hover:bg-secondary/5",
                    restoringId === todo.id && "opacity-50"
                  )}
                >
                  Restore
                </button>
              ) : (
                <>
                  <Link
                    to={paths.app.todoEdit.getHref(todo.id)}
                    className="rounded-lg border border-surface-container px-4 py-2 text-sm font-semibold hover:bg-surface-container-low"
                  >
                    Edit
                  </Link>
                  <Link
                    to={paths.app.todoDetail.getHref(todo.id)}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    View
                  </Link>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
