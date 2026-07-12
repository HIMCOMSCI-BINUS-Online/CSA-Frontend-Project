import { Form, Input } from "@/components/ui/form";
import {
  loginEditorialInput,
  loginEditorialLabel,
} from "@/features/auth/utils/editorial-form-classes";
import { type TodoFormValues, todoFormSchema } from "@/features/todos/api/get-todos";
import type { Todo } from "../types";

type TodoFormProps = {
  defaultValues?: Partial<Todo>;
  onSubmit: (values: TodoFormValues) => void;
  isPending?: boolean;
  submitLabel?: string;
};

export function TodoForm({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel = "Save Task",
}: TodoFormProps) {
  return (
    <Form<TodoFormValues>
      schema={todoFormSchema}
      onSubmit={onSubmit}
      options={{
        defaultValues: {
          title: defaultValues?.title ?? "",
          description: defaultValues?.description ?? "",
          dueDate: defaultValues?.dueDate ?? "",
          priority: defaultValues?.priority ?? "medium",
          status: defaultValues?.status ?? "pending",
        },
      }}
    >
      {({ register, formState }) => (
        <div className="space-y-6 rounded-xl border border-surface-container bg-white p-6 shadow-sm">
          <Input
            label="Title"
            labelClassName={loginEditorialLabel}
            containerClassName="space-y-2"
            error={formState.errors.title}
            registration={register("title")}
            className={loginEditorialInput}
            placeholder="Belajar Express"
          />
          <div className="space-y-2">
            <label className={loginEditorialLabel} htmlFor="todo-description">
              Description
            </label>
            <textarea
              id="todo-description"
              rows={4}
              className={loginEditorialInput}
              placeholder="Task details..."
              {...register("description")}
            />
          </div>
          <Input
            type="date"
            label="Due Date"
            labelClassName={loginEditorialLabel}
            containerClassName="space-y-2"
            error={formState.errors.dueDate}
            registration={register("dueDate")}
            className={loginEditorialInput}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className={loginEditorialLabel} htmlFor="todo-priority">
                Priority
              </label>
              <select id="todo-priority" className={loginEditorialInput} {...register("priority")}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className={loginEditorialLabel} htmlFor="todo-status">
                Status
              </label>
              <select id="todo-status" className={loginEditorialInput} {...register("status")}>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-inverse-surface px-6 py-3 font-body text-sm font-bold text-primary-foreground disabled:opacity-50"
          >
            {isPending ? "Saving..." : submitLabel}
          </button>
        </div>
      )}
    </Form>
  );
}
