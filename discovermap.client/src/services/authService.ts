import type { LoginRequest, RegisterRequest, AuthUser } from "../types/auth";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    const fallbackText = await res.text().catch(() => "");
    const message =
      data?.errors?.join(" ") ||
      fallbackText ||
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }
  return res.json();
}

export const authService = {
  async login(payload: LoginRequest): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async register(payload: RegisterRequest): Promise<string> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      const message = data?.errors?.join(" ") ?? `Request failed with status ${res.status}`;
      throw new Error(message);
    }
    return res.text();
  },

  async logout(): Promise<void> {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  },

  async me(): Promise<AuthUser | null> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) return null;
    return res.json();
  },
};