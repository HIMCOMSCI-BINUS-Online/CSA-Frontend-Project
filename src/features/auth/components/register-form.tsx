import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";
import { Form, Input } from "@/components/ui/form";
import { FormError } from "@/components/ui/form/error";
import { type RegisterInput, registerInputSchema, useRegister } from "@/features/auth/api/get-auth";
import {
  registerEditorialInput,
  registerEditorialLabel,
} from "@/features/auth/utils/editorial-form-classes";
import { cn } from "@/utils/cn";

type RegisterFormProps = { onSuccess: () => void };

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const registerMutation = useRegister({ onSuccess });
  const termsId = useId();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form<RegisterInput>
      onSubmit={(values) =>
        registerMutation.mutate({
          email: values.email,
          username: values.username,
          password: values.password,
        })
      }
      schema={registerInputSchema}
      options={{ defaultValues: { username: "", email: "", password: "", termsAccepted: false } }}
    >
      {({ register, formState }) => (
        <div className="space-y-8">
          <div className="space-y-6">
            <Input
              type="text"
              label="Username"
              labelClassName={registerEditorialLabel}
              containerClassName="space-y-2"
              error={formState.errors.username}
              registration={register("username")}
              className={registerEditorialInput}
              placeholder="user_1"
              autoComplete="username"
            />
            <Input
              type="email"
              label="Email Address"
              labelClassName={registerEditorialLabel}
              containerClassName="space-y-2"
              error={formState.errors.email}
              registration={register("email")}
              className={registerEditorialInput}
              placeholder="user@gmail.com"
              autoComplete="email"
            />
            <div className="space-y-2">
              <label
                className={cn(registerEditorialLabel, "ml-0 block")}
                htmlFor="register-password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={cn(registerEditorialInput, "pr-14")}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
              <FormError errorMessage={formState.errors.password?.message} />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <input
              id={termsId}
              type="checkbox"
              className="mt-0.5 size-4 rounded border-outline text-secondary focus:ring-secondary/20"
              {...register("termsAccepted")}
            />
            <label className="text-sm text-on-surface-variant" htmlFor={termsId}>
              I agree to the Terms of Service and Privacy Policy.
            </label>
          </div>
          <FormError errorMessage={formState.errors.termsAccepted?.message} />
          {registerMutation.isError ? (
            <div role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {registerMutation.error.message}
            </div>
          ) : null}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="flex w-full items-center justify-center rounded-lg bg-inverse-surface py-4 text-sm font-bold text-primary-foreground disabled:opacity-50"
          >
            {registerMutation.isPending ? (
              <span className="inline-block size-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      )}
    </Form>
  );
};
