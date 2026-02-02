import React, { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";

type AuthStatus = "loading" | "unauthenticated" | "authenticated" | "pending";

type AuthContextType = {
  status: AuthStatus;
  user: authApi.AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<authApi.AuthUser | null>(null);

  const refresh = async () => {
    const token = sessionStorage.getItem("novus_token");
    if (!token) {
      setStatus("unauthenticated");
      setUser(null);
      return;
    }

    try {
      const me = await authApi.getMe();
      setUser(me);
      setStatus("authenticated");
    } catch (err: any) {
      // ✅ Handle case where token is valid but user is not yet approved
      if (err.response?.status === 403) {
        setStatus("pending");
        setUser(null);
      } else {
        sessionStorage.removeItem("novus_token");
        setUser(null);
        setStatus("unauthenticated");
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { access_token } = await authApi.login(email, password);
      sessionStorage.setItem("novus_token", access_token);

      const me = await authApi.getMe();
      setUser(me);
      setStatus("authenticated");
    } catch (err: any) {
      if (err.response?.status === 403) {
        setStatus("pending");
        // We don't throw here so the LoginPage can catch it and show the toast
        throw err; 
      }
      throw err;
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    setStatus("unauthenticated");
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        login,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}