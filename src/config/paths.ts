export const paths = {
  home: { path: "/", getHref: () => "/" },
  auth: {
    login: {
      path: "/auth/login",
      getHref: (redirectTo?: string | null) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    register: {
      path: "/auth/register",
      getHref: (redirectTo?: string | null) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  },
  app: {
    root: { path: "/app", getHref: () => "/app" },
    dashboard: { path: "", getHref: () => "/app" },
    todos: { path: "todos", getHref: () => "/app/todos" },
    todosToday: { path: "todos/today", getHref: () => "/app/todos/today" },
    todosOverdue: { path: "todos/overdue", getHref: () => "/app/todos/overdue" },
    todosCompleted: { path: "todos/completed", getHref: () => "/app/todos/completed" },
    todosDeleted: { path: "todos/deleted", getHref: () => "/app/todos/deleted" },
    todosNew: { path: "todos/new", getHref: () => "/app/todos/new" },
    todoDetail: { path: "todos/:id", getHref: (id: string | number) => `/app/todos/${id}` },
    todoEdit: { path: "todos/:id/edit", getHref: (id: string | number) => `/app/todos/${id}/edit` },
  },
} as const;
