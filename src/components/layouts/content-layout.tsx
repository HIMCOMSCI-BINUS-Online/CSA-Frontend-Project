import type * as React from "react";

type ContentLayoutProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function ContentLayout({ title, description, actions, children }: ContentLayoutProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 font-body text-on-surface-variant">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 gap-3">{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}
