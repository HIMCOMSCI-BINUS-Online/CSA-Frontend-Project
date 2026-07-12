export type TodoPriority = "low" | "medium" | "high";
export type TodoStatus = "pending" | "in_progress" | "completed";

export type Todo = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: TodoPriority;
  status: TodoStatus;
  isDeleted: boolean;
  deletedAt: string | null;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type DashboardSummary = {
  allTasks: number;
  todayTasks: number;
  overdueTasks: number;
  completedTasks: number;
  deletedTasks: number;
};

export type TodoListParams = {
  status?: string;
  q?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
  sortBy?: string;
  order?: "asc" | "desc";
};

export type TodoFormInput = {
  title: string;
  description: string;
  dueDate: string;
  priority: TodoPriority;
  status: TodoStatus;
};
