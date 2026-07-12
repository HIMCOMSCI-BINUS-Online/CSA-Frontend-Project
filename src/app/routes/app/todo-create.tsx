import { useNavigate } from "react-router-dom";
import { ContentLayout } from "@/components/layouts";
import { Head } from "@/components/seo";
import { paths } from "@/config/paths";
import { useCreateTodo } from "@/features/todos/api/get-todos";
import { TodoForm } from "@/features/todos/components/todo-form";

export function Component() {
  const navigate = useNavigate();
  const createTodo = useCreateTodo({ onSuccess: () => navigate(paths.app.todos.getHref()) });
  return (
    <>
      <Head title="Create Task" />
      <ContentLayout title="Create Task" description="Add a new task to your workspace.">
        <TodoForm
          onSubmit={(values) => createTodo.mutate(values)}
          isPending={createTodo.isPending}
          submitLabel="Create Task"
        />
      </ContentLayout>
    </>
  );
}
