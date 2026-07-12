import { Link, useNavigate, useParams } from "react-router-dom";
import { ContentLayout } from "@/components/layouts";
import { Head } from "@/components/seo";
import { Spinner } from "@/components/ui/spinner";
import { paths } from "@/config/paths";
import { useChangeTodoStatus, useDeleteTodo, useTodoDetail } from "@/features/todos/api/get-todos";
import { TodoPriorityBadge, TodoStatusBadge } from "@/features/todos/components/todo-status-badge";
import type { TodoStatus } from "@/features/todos/types";
import { formatDueDate } from "@/features/todos/utils/todo-display";

export function Component() {
  const { id } = useParams();
  const navigate = useNavigate();
  const detail = useTodoDetail(id);
  const changeStatus = useChangeTodoStatus();
  const deleteTodo = useDeleteTodo();

  if (detail.isPending)
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  if (!detail.data) return <div className="p-8 text-red-600">Task not found.</div>;

  const todo = detail.data;

  return (
    <>
      <Head title={todo.title} />
      <ContentLayout
        title={todo.title}
        description={`Due ${formatDueDate(todo.dueDate)}`}
        actions={
          <>
            <Link
              to={paths.app.todoEdit.getHref(todo.id)}
              className="rounded-lg border border-surface-container px-4 py-2 text-sm font-semibold"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() =>
                deleteTodo.mutate(todo.id, { onSuccess: () => navigate(paths.app.todos.getHref()) })
              }
              className="rounded-lg bg-error px-4 py-2 text-sm font-semibold text-white"
            >
              Delete
            </button>
          </>
        }
      >
        <div className="space-y-6 rounded-xl border border-surface-container bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <TodoStatusBadge status={todo.status} />
            <TodoPriorityBadge priority={todo.priority} />
          </div>
          <p className="whitespace-pre-wrap text-on-surface-variant">
            {todo.description || "No description."}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 text-sm text-on-surface-variant">
            <p>Created by {todo.createdBy}</p>
            <p>Updated by {todo.updatedBy}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["pending", "in_progress", "completed"] as TodoStatus[]).map((status) => (
              <button
                key={status}
                type="button"
                disabled={todo.status === status || changeStatus.isPending}
                onClick={() => changeStatus.mutate({ id: todo.id, status })}
                className="rounded-lg border border-surface-container px-3 py-2 text-sm font-semibold capitalize disabled:opacity-50"
              >
                Mark {status.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
