import { useNotifications } from "@/components/ui/notifications";
import { env } from "@/config/env";
import { paths } from "@/config/paths";
import type { ApiResponse } from "@/types/api";

type RequestConfig = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string>;
};

export async function api<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
  const { method = "GET", headers = {}, body, params } = config;
  let url = `${env.API_URL}${endpoint}`;
  if (params) url = `${url}?${new URLSearchParams(params).toString()}`;

  const fetchConfig: RequestInit = {
    method,
    headers: { "Content-Type": "application/json", Accept: "application/json", ...headers },
  };
  if (body) fetchConfig.body = JSON.stringify(body);

  const token = localStorage.getItem("auth_token");
  if (token) (fetchConfig.headers as Record<string, string>).Authorization = `Bearer ${token}`;

  const response = await fetch(url, fetchConfig);
  const payload = (await response.json().catch(() => ({}))) as ApiResponse<T> & {
    message?: string;
  };

  if (!response.ok || payload.success === false) {
    const message = payload.message ?? response.statusText;
    useNotifications.getState().addNotification({ type: "error", title: "Error", message });
    if (response.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      window.location.href = paths.auth.login.getHref();
    }
    throw new Error(message);
  }

  return payload.data;
}
