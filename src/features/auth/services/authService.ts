import { api } from "@/lib/api-client";
import type { AuthPayload, User } from "@/types/api";
import type { LoginRequest, RegisterRequest } from "../types";

export async function loginWithEmailAndPassword(data: LoginRequest): Promise<AuthPayload> {
  return api<AuthPayload>("/auth/login", { method: "POST", body: data });
}

export async function registerWithEmailAndPassword(data: RegisterRequest): Promise<AuthPayload> {
  return api<AuthPayload>("/auth/signup", { method: "POST", body: data });
}

export async function fetchAuthUser(): Promise<User | null> {
  const token = localStorage.getItem("auth_token");
  if (!token) return null;
  try {
    return await api<User>("/auth/me");
  } catch {
    return null;
  }
}

export async function logoutAuthSession(): Promise<void> {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}
