import type * as React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { useLogout, useUser } from "@/features/auth/api/get-auth";
import { cn } from "@/utils/cn";
import { dashboardSidebarItems } from "./dashboard-sidebar-items";

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  const logout = useLogout({ onSuccess: () => navigate(paths.auth.login.getHref()) });

  return (
    <div className="flex h-full flex-col gap-2 p-6 md:p-8">
      <nav className="flex flex-1 flex-col gap-2">
        {dashboardSidebarItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 font-body text-sm font-semibold tracking-wide transition-all duration-300",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-secondary/10"
                  : "text-primary hover:translate-x-1 hover:bg-surface-container-low active:scale-95"
              )
            }
          >
            <span className="material-symbols-outlined shrink-0 !text-[22px] leading-none">
              {item.icon}
            </span>
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-2 border-t border-surface-container pt-4">
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            logout.mutate(undefined);
          }}
          className="flex items-center gap-3 rounded-lg px-4 py-3 font-body text-sm font-semibold text-primary transition-all hover:translate-x-1 hover:bg-surface-container-low"
        >
          <span className="material-symbols-outlined shrink-0 !text-[22px] leading-none">
            logout
          </span>
          Log Out
        </button>
      </div>
    </div>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const displayName = user.data?.username ?? "";
  const email = user.data?.email ?? "";

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <header className="fixed top-0 z-50 flex h-20 w-full items-center justify-between gap-4 bg-surface/90 px-4 shadow-sm backdrop-blur-xl md:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            className="rounded-lg p-2 text-primary md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined !text-[26px]">menu</span>
          </button>
          <span className="truncate font-headline text-xl font-bold tracking-tighter text-primary md:text-2xl">
            CSA Portal
          </span>
        </div>
        <div className="hidden min-w-0 text-right sm:block">
          <p className="truncate font-body text-sm font-semibold">{displayName || "Signed in"}</p>
          {email ? (
            <p className="truncate font-body text-xs text-on-surface-variant">{email}</p>
          ) : null}
        </div>
      </header>
      <div className="flex pt-20">
        <aside className="fixed left-0 top-20 z-40 hidden h-[calc(100vh-5rem)] w-72 flex-col bg-surface md:flex after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-surface-container-low">
          <SidebarContent />
        </aside>
        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-[60] md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            />
            <aside className="absolute inset-y-0 left-0 z-[70] flex w-72 max-w-[85vw] flex-col bg-surface shadow-xl">
              <div className="flex items-center justify-end border-b border-surface-container-low px-4 py-3">
                <button
                  type="button"
                  className="rounded-lg p-2"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <SidebarContent onNavigate={() => setMobileMenuOpen(false)} />
              </div>
            </aside>
          </div>
        ) : null}
        <main className="min-h-[calc(100vh-5rem)] w-full flex-1 md:ml-72">{children}</main>
      </div>
    </div>
  );
}
