import { paths } from "@/config/paths";

export const dashboardSidebarItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    to: paths.app.dashboard.getHref(),
    icon: "dashboard",
    end: true,
  },
  { id: "all", name: "All Tasks", to: paths.app.todos.getHref(), icon: "list_alt", end: true },
  { id: "today", name: "Today", to: paths.app.todosToday.getHref(), icon: "today", end: true },
  {
    id: "overdue",
    name: "Overdue",
    to: paths.app.todosOverdue.getHref(),
    icon: "event_busy",
    end: true,
  },
  {
    id: "completed",
    name: "Completed",
    to: paths.app.todosCompleted.getHref(),
    icon: "task_alt",
    end: true,
  },
  {
    id: "deleted",
    name: "Deleted",
    to: paths.app.todosDeleted.getHref(),
    icon: "delete",
    end: true,
  },
  {
    id: "create",
    name: "Create Task",
    to: paths.app.todosNew.getHref(),
    icon: "add_circle",
    end: true,
  },
] as const;
