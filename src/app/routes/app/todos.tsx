import { useState } from "react";
import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layouts";
import { Head } from "@/components/seo";
import { paths } from "@/config/paths";
import { useTodos } from "@/features/todos/api/get-todos";
import { TodoFilters } from "@/features/todos/components/todo-filters";
import { TodoList } from "@/features/todos/components/todo-list";
import type { TodoListParams } from "@/features/todos/types";

export function Component() {
  const [params, setParams] = useState<TodoListParams>({ sortBy: "createdAt", order: "desc" });
  const todos = useTodos("all", params);
  return (
    <>
      <Head title="All Tasks" />
      <ContentLayout
        title="All Tasks"
        description="Browse, filter, and manage your full task list."
        actions={
          <Link
            to={paths.app.todosNew.getHref()}
            className="rounded-lg bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground"
          >
            Create Task
          </Link>
        }
      >
        <TodoFilters params={params} onChange={setParams} />
        <TodoList todos={todos.data} isLoading={todos.isPending} isError={todos.isError} />
      </ContentLayout>
    </>
  );
}
