import { useNavigate, useParams } from "react-router-dom";
import { ContentLayout } from "@/components/layouts";
import { Head } from "@/components/seo";
import { Spinner } from "@/components/ui/spinner";
import { paths } from "@/config/paths";
import { useTodoDetail, useUpdateTodo } from "@/features/todos/api/get-todos";
import { TodoForm } from "@/features/todos/components/todo-form";

export function Component() {
  const { id } = useParams();
  const navigate = useNavigate();
  const detail = useTodoDetail(id);
  const updateTodo = useUpdateTodo({
    onSuccess: () => navigate(paths.app.todoDetail.getHref(id ?? "")),
  });

  if (detail.isPending)
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  if (!detail.data) return <div className="p-8 text-red-600">Task not found.</div>;

  return (
    <>
      <Head title="Update Task" />
      <ContentLayout title="Update Task" description="Edit task details and save changes.">
        <TodoForm
          defaultValues={detail.data}
          onSubmit={(values) => updateTodo.mutate({ id: id ?? "", data: values })}
          isPending={updateTodo.isPending}
          submitLabel="Save Changes"
        />
      </ContentLayout>
    </>
  );
}
