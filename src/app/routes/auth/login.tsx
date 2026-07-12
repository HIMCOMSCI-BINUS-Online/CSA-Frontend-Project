import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layouts";
import { paths } from "@/config/paths";
import { LoginForm } from "@/features/auth/components/login-form";

export function Component() {
  const navigate = useNavigate();
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to manage your tasks." variant="login">
      <LoginForm onSuccess={() => navigate(paths.app.dashboard.getHref())} />
    </AuthLayout>
  );
}
