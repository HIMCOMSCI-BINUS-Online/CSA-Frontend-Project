import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layouts";
import { Head } from "@/components/seo";
import { paths } from "@/config/paths";
import { useDashboardSummary } from "@/features/todos/api/get-todos";
import { DashboardSummaryCards } from "@/features/todos/components/dashboard-summary-cards";

export function Component() {
  const summary = useDashboardSummary();
  return (
    <>
      <Head title="Dashboard" />
      <ContentLayout
        title="Operational Overview"
        description="Summary of your task workload across all views."
        actions={
          <Link
            to={paths.app.todosNew.getHref()}
            className="rounded-lg bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground"
          >
            Create Task
          </Link>
        }
      >
        <DashboardSummaryCards summary={summary.data} isLoading={summary.isPending} />
      </ContentLayout>
    </>
  );
}
