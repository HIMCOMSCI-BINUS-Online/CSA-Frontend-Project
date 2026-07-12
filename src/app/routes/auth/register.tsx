import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layouts";
import { paths } from "@/config/paths";
import { RegisterForm } from "@/features/auth/components/register-form";

export function Component() {
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join CSA Portal and start organizing tasks."
      variant="register"
    >
      <RegisterForm onSuccess={() => navigate(paths.app.dashboard.getHref())} />
      <footer className="mt-8 text-center text-sm text-on-surface-variant">
        Already have an account?{" "}
        <Link
          to={paths.auth.login.getHref()}
          className="font-bold text-inverse-surface hover:underline"
        >
          Sign in
        </Link>
      </footer>
    </AuthLayout>
  );
}
