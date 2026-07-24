import { useState, useCallback } from "react";
import { authService } from "../services/authService";
import type { LoginRequest, RegisterRequest } from "../types/auth";

const TOKEN_KEY = "discovermap_token";

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (payload: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const { token } = await authService.login(payload);
      localStorage.setItem(TOKEN_KEY, token);
      setToken(token);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      await authService.register(payload);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  return { token, loading, error, login, register, logout, isAuthenticated: !!token };
}