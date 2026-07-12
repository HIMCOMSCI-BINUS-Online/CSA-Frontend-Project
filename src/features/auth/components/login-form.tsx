import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Form, Input } from "@/components/ui/form";
import { FormError } from "@/components/ui/form/error";
import { paths } from "@/config/paths";
import { type LoginInput, loginInputSchema, useLogin } from "@/features/auth/api/get-auth";
import {
  loginEditorialInput,
  loginEditorialLabel,
} from "@/features/auth/utils/editorial-form-classes";
import { cn } from "@/utils/cn";

type LoginFormProps = { onSuccess: () => void };

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({ onSuccess });

  return (
    <div>
      <Form<LoginInput> onSubmit={(values) => login.mutate(values)} schema={loginInputSchema}>
        {({ register, formState }) => (
          <div className="space-y-8">
            <Input
              type="email"
              label="Email Address"
              labelClassName={loginEditorialLabel}
              containerClassName="space-y-2"
              error={formState.errors.email}
              registration={register("email")}
              className={loginEditorialInput}
              placeholder="user@gmail.com"
              autoComplete="email"
            />
            <div className="space-y-2">
              <label className={cn(loginEditorialLabel, "ml-0")} htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className={loginEditorialInput}
                {...register("password")}
              />
              <FormError errorMessage={formState.errors.password?.message} />
            </div>
            {login.isError ? (
              <div role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {login.error.message}
              </div>
            ) : null}
            <button
              type="submit"
              disabled={login.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-inverse-surface py-4 font-body text-base font-bold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
            >
              {login.isPending ? (
                <span className="inline-block size-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : null}
              Sign In
              {!login.isPending ? <ArrowRight className="size-5" strokeWidth={2} /> : null}
            </button>
          </div>
        )}
      </Form>
      <footer className="mt-12 text-center">
        <p className="text-sm text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <Link
            to={paths.auth.register.getHref()}
            className="font-bold text-inverse-surface underline-offset-4 hover:underline"
          >
            Create account
          </Link>
        </p>
      </footer>
    </div>
  );
};
