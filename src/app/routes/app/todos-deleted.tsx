import { useState } from "react";
import { ContentLayout } from "@/components/layouts";
import { Head } from "@/components/seo";
import { useRestoreTodo, useTodos } from "@/features/todos/api/get-todos";
import { TodoFilters } from "@/features/todos/components/todo-filters";
import { TodoList } from "@/features/todos/components/todo-list";
import type { TodoListParams } from "@/features/todos/types";

export function Component() {
  const [params, setParams] = useState<TodoListParams>({ sortBy: "dueDate", order: "asc" });
  const todos = useTodos("deleted", params);
  const restore = useRestoreTodo();
  return (
    <>
      <Head title="Deleted Tasks" />
      <ContentLayout title="Deleted Tasks" description="Soft-deleted tasks that can be restored.">
        <TodoFilters params={params} onChange={setParams} showStatusFilter={false} />
        <TodoList
          todos={todos.data}
          isLoading={todos.isPending}
          isError={todos.isError}
          emptyMessage="No tasks in this view."
          showRestore
          onRestore={(id) => restore.mutate(id)}
          restoringId={restore.isPending ? restore.variables : null}
        />
      </ContentLayout>
    </>
  );
}
