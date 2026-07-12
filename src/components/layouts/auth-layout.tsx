import type * as React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Head } from "@/components/seo";
import { paths } from "@/config/paths";
import { useUser } from "@/features/auth/api/get-auth";
import { cn } from "@/utils/cn";
import { AuthHeroPane } from "./auth-hero-pane";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  variant?: "login" | "register";
};

export const AuthLayout = ({ children, title, subtitle, variant = "login" }: LayoutProps) => {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) navigate(paths.app.dashboard.getHref(), { replace: true });
  }, [user.data, navigate]);

  return (
    <>
      <Head title={title} />
      <div className="relative flex min-h-screen w-full overflow-hidden bg-surface font-body text-on-surface antialiased">
        <Link
          to={paths.home.getHref()}
          className="absolute left-4 top-6 z-50 rounded md:left-8 md:top-8"
        >
          <span className="font-headline text-xl font-bold tracking-tighter text-primary md:text-2xl lg:text-primary-foreground">
            CSA Portal
          </span>
        </Link>
        <AuthHeroPane variant={variant} />
        <section className="flex w-full flex-col items-center justify-center bg-surface px-4 pb-8 pt-20 md:px-8 md:pb-24 md:pt-24 lg:w-1/2 lg:px-12">
          <div className={cn("w-full max-w-md", variant === "register" && "space-y-10")}>
            <header className={cn(variant === "register" ? "space-y-4" : "mb-8")}>
              <h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface">
                {title}
              </h1>
              <p className="font-body text-on-surface-variant">{subtitle}</p>
            </header>
            {children}
          </div>
        </section>
      </div>
    </>
  );
};
