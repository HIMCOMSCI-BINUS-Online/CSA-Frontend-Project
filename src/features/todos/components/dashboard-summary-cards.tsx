import { Link } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { paths } from "@/config/paths";
import type { DashboardSummary } from "../types";

const cards = [
  { key: "allTasks" as const, label: "All Tasks", to: paths.app.todos.getHref(), icon: "list_alt" },
  { key: "todayTasks" as const, label: "Today", to: paths.app.todosToday.getHref(), icon: "today" },
  {
    key: "overdueTasks" as const,
    label: "Overdue",
    to: paths.app.todosOverdue.getHref(),
    icon: "event_busy",
  },
  {
    key: "completedTasks" as const,
    label: "Completed",
    to: paths.app.todosCompleted.getHref(),
    icon: "task_alt",
  },
  {
    key: "deletedTasks" as const,
    label: "Deleted",
    to: paths.app.todosDeleted.getHref(),
    icon: "delete",
  },
];

export function DashboardSummaryCards({
  summary,
  isLoading,
}: {
  summary: DashboardSummary | undefined;
  isLoading: boolean;
}) {
  if (isLoading)
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <Link
          key={card.key}
          to={card.to}
          className="rounded-xl border border-surface-container bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="material-symbols-outlined text-secondary">{card.icon}</span>
            <span className="font-headline text-3xl font-bold text-on-surface">
              {summary?.[card.key] ?? 0}
            </span>
          </div>
          <p className="mt-3 font-body text-sm font-semibold text-on-surface-variant">
            {card.label}
          </p>
        </Link>
      ))}
    </div>
  );
}
