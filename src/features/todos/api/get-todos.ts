import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  changeTodoStatus,
  createTodo,
  deleteTodo,
  fetchCompletedTodos,
  fetchDashboardSummary,
  fetchDeletedTodos,
  fetchOverdueTodos,
  fetchTodayTodos,
  fetchTodoDetail,
  fetchTodos,
  restoreTodo,
  updateTodo,
} from "@/features/todos/services/todoService";
import type { TodoFormInput, TodoListParams } from "../types";

export const todoFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(150),
  description: z.string().max(1000).default(""),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["pending", "in_progress", "completed"]),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;

export const todosKeys = {
  all: ["todos"] as const,
  lists: () => [...todosKeys.all, "list"] as const,
  list: (scope: string, params: TodoListParams) => [...todosKeys.lists(), scope, params] as const,
  details: () => [...todosKeys.all, "detail"] as const,
  detail: (id: string | number) => [...todosKeys.details(), id] as const,
  summary: () => [...todosKeys.all, "summary"] as const,
};

export function useDashboardSummary() {
  return useQuery({ queryKey: todosKeys.summary(), queryFn: fetchDashboardSummary });
}

export function useTodos(
  scope: "all" | "today" | "overdue" | "completed" | "deleted",
  params: TodoListParams = {}
) {
  const fetchers = {
    all: fetchTodos,
    today: fetchTodayTodos,
    overdue: fetchOverdueTodos,
    completed: fetchCompletedTodos,
    deleted: fetchDeletedTodos,
  };
  return useQuery({
    queryKey: todosKeys.list(scope, params),
    queryFn: () => fetchers[scope](params),
  });
}

export function useTodoDetail(id: string | undefined) {
  return useQuery({
    queryKey: todosKeys.detail(id ?? "unknown"),
    queryFn: () => fetchTodoDetail(id as string),
    enabled: Boolean(id),
  });
}

function invalidateTodos(qc: ReturnType<typeof useQueryClient>) {
  return qc.invalidateQueries({ queryKey: todosKeys.all });
}

export function useCreateTodo({ onSuccess }: { onSuccess?: () => void } = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: TodoFormInput) => createTodo(data),
    onSuccess: async () => {
      await invalidateTodos(qc);
      onSuccess?.();
    },
  });
}

export function useUpdateTodo({ onSuccess }: { onSuccess?: () => void } = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: TodoFormInput }) =>
      updateTodo(id, data),
    onSuccess: async () => {
      await invalidateTodos(qc);
      onSuccess?.();
    },
  });
}

export function useChangeTodoStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string | number; status: TodoFormInput["status"] }) =>
      changeTodoStatus(id, status),
    onSuccess: () => invalidateTodos(qc),
  });
}

export function useDeleteTodo() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: deleteTodo, onSuccess: () => invalidateTodos(qc) });
}

export function useRestoreTodo() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: restoreTodo, onSuccess: () => invalidateTodos(qc) });
}
