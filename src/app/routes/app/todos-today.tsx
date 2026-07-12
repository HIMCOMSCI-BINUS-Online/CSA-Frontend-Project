import { useState } from "react";
import { ContentLayout } from "@/components/layouts";
import { Head } from "@/components/seo";
import { useTodos } from "@/features/todos/api/get-todos";
import { TodoFilters } from "@/features/todos/components/todo-filters";
import { TodoList } from "@/features/todos/components/todo-list";
import type { TodoListParams } from "@/features/todos/types";

export function Component() {
  const [params, setParams] = useState<TodoListParams>({ sortBy: "dueDate", order: "asc" });
  const todos = useTodos("today", params);
  return (
    <>
      <Head title="Today" />
      <ContentLayout title="Today" description="Tasks due today.">
        <TodoFilters params={params} onChange={setParams} showStatusFilter={false} />
        <TodoList
          todos={todos.data}
          isLoading={todos.isPending}
          isError={todos.isError}
          emptyMessage="No tasks in this view."
        />
      </ContentLayout>
    </>
  );
}
