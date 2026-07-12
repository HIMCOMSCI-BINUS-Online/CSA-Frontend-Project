import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { TodoListParams } from "../types";

type TodoFiltersProps = {
  params: TodoListParams;
  onChange: (params: TodoListParams) => void;
  showStatusFilter?: boolean;
};

export function TodoFilters({ params, onChange, showStatusFilter = true }: TodoFiltersProps) {
  const [search, setSearch] = useState(params.q ?? "");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onChange({ ...params, q: value || undefined });
  }, 300);

  return (
    <div className="mb-6 grid gap-4 rounded-xl border border-surface-container bg-white p-4 md:grid-cols-4">
      <div className="md:col-span-2">
        <label
          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-on-surface-variant"
          htmlFor="todo-search"
        >
          Search
        </label>
        <input
          id="todo-search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            debouncedSearch(e.target.value);
          }}
          placeholder="Search by title..."
          className="w-full rounded-lg border border-surface-container px-3 py-2 text-sm"
        />
      </div>
      {showStatusFilter ? (
        <div>
          <label
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-on-surface-variant"
            htmlFor="todo-status-filter"
          >
            Status
          </label>
          <select
            id="todo-status-filter"
            value={params.status ?? ""}
            onChange={(e) => onChange({ ...params, status: e.target.value || undefined })}
            className="w-full rounded-lg border border-surface-container px-3 py-2 text-sm"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      ) : null}
      <div>
        <label
          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-on-surface-variant"
          htmlFor="todo-sort"
        >
          Sort
        </label>
        <select
          id="todo-sort"
          value={params.sortBy ?? "createdAt"}
          onChange={(e) => onChange({ ...params, sortBy: e.target.value })}
          className="w-full rounded-lg border border-surface-container px-3 py-2 text-sm"
        >
          <option value="createdAt">Created</option>
          <option value="dueDate">Due Date</option>
          <option value="title">Title</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  );
}
