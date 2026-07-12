import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  fetchAuthUser,
  loginWithEmailAndPassword,
  logoutAuthSession,
  registerWithEmailAndPassword,
} from "@/features/auth/services/authService";
import { useAuthStore } from "./auth-store";

export const loginInputSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const registerInputSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username only letters, numbers, underscore"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(8, "Must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain uppercase letter")
    .regex(/[a-z]/, "Password must contain lowercase letter")
    .regex(/[0-9]/, "Password must contain number"),
  termsAccepted: z.boolean().refine((v) => v, { message: "You must accept the Terms of Service" }),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

export function useUser() {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: fetchAuthUser,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useLogin({ onSuccess }: { onSuccess: () => void }) {
  const queryClient = useQueryClient();
  const { setToken } = useAuthStore();
  return useMutation({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (response) => {
      setToken(response.token);
      localStorage.setItem("auth_user", JSON.stringify(response.user));
      queryClient.setQueryData(["auth", "user"], response.user);
      onSuccess();
    },
  });
}

export function useRegister({ onSuccess }: { onSuccess: () => void }) {
  const queryClient = useQueryClient();
  const { setToken } = useAuthStore();
  return useMutation({
    mutationFn: registerWithEmailAndPassword,
    onSuccess: (response) => {
      setToken(response.token);
      localStorage.setItem("auth_user", JSON.stringify(response.user));
      queryClient.setQueryData(["auth", "user"], response.user);
      onSuccess();
    },
  });
}

export function useLogout({ onSuccess }: { onSuccess: () => void }) {
  const queryClient = useQueryClient();
  const { setToken } = useAuthStore();
  return useMutation({
    mutationFn: logoutAuthSession,
    onSuccess: () => {
      setToken(null);
      localStorage.removeItem("auth_user");
      queryClient.setQueryData(["auth", "user"], null);
      queryClient.clear();
      onSuccess();
    },
  });
}
