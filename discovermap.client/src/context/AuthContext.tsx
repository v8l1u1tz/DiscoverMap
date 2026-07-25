import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { authService } from "../services/authService";
import type { LoginRequest, RegisterRequest, AuthUser } from "../types/auth";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  checkingAuth: boolean;
  error: string | null;
  login: (payload: LoginRequest) => Promise<boolean>;
  register: (payload: RegisterRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authService
      .me()
      .then(setUser)
      .finally(() => setCheckingAuth(false));
  }, []);

  const login = useCallback(async (payload: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      await authService.login(payload);
      const me = await authService.me();
      setUser(me);
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

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        checkingAuth,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}