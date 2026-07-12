import { api } from "@/lib/api-client";
import type { DashboardSummary, Todo, TodoFormInput, TodoListParams } from "../types";

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  return api<DashboardSummary>("/todos/dashboard/summary");
}

export async function fetchTodos(params: TodoListParams = {}): Promise<Todo[]> {
  const cleanParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value) cleanParams[key] = value;
  }
  return api<Todo[]>("/todos", { params: cleanParams });
}

export async function fetchTodayTodos(params: TodoListParams = {}): Promise<Todo[]> {
  const cleanParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value) cleanParams[key] = value;
  }
  return api<Todo[]>("/todos/today", { params: cleanParams });
}

export async function fetchOverdueTodos(params: TodoListParams = {}): Promise<Todo[]> {
  const cleanParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value) cleanParams[key] = value;
  }
  return api<Todo[]>("/todos/overdue", { params: cleanParams });
}

export async function fetchCompletedTodos(params: TodoListParams = {}): Promise<Todo[]> {
  const cleanParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value) cleanParams[key] = value;
  }
  return api<Todo[]>("/todos/completed", { params: cleanParams });
}

export async function fetchDeletedTodos(params: TodoListParams = {}): Promise<Todo[]> {
  const cleanParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value) cleanParams[key] = value;
  }
  return api<Todo[]>("/todos/deleted", { params: cleanParams });
}

export async function fetchTodoDetail(id: string | number): Promise<Todo> {
  return api<Todo>(`/todos/${id}`);
}

export async function createTodo(data: TodoFormInput): Promise<Todo> {
  return api<Todo>("/todos", { method: "POST", body: data });
}

export async function updateTodo(id: string | number, data: TodoFormInput): Promise<Todo> {
  return api<Todo>(`/todos/${id}`, { method: "PUT", body: data });
}

export async function changeTodoStatus(
  id: string | number,
  status: TodoFormInput["status"]
): Promise<Todo> {
  return api<Todo>(`/todos/${id}/status`, { method: "PATCH", body: { status } });
}

export async function deleteTodo(id: string | number): Promise<Todo> {
  return api<Todo>(`/todos/${id}`, { method: "DELETE" });
}

export async function restoreTodo(id: string | number): Promise<Todo> {
  return api<Todo>(`/todos/${id}/restore`, { method: "PATCH" });
}
