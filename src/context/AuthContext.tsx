import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "../types";
import {
  getMeRequest,
  loginRequest,
  googleLoginRequest,
  logoutRequest,
  RegisterPayload,
  registerRequest,
} from "../api/auth";
import { signInWithGooglePopup } from "../config/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const me = await getMeRequest();
      setUser(me);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      const hasToken = localStorage.getItem("studynest_token");
      if (hasToken) {
        await refreshUser();
      }
      setLoading(false);
    };
    init();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginRequest(email, password) as { token?: string };
    if (data.token) {
      localStorage.setItem("studynest_token", data.token);
    }
    await refreshUser();
  };

  const loginWithGoogle = async () => {
    const idToken = await signInWithGooglePopup();
    const data = await googleLoginRequest(idToken) as { token?: string };
    if (data.token) {
      localStorage.setItem("studynest_token", data.token);
    }
    await refreshUser();
  };

  const register = async (payload: RegisterPayload) => {
    const data = await registerRequest(payload) as { token?: string };
    if (data.token) {
      localStorage.setItem("studynest_token", data.token);
    }
    await refreshUser();
  };

  const logout = async () => {
    await logoutRequest().catch(() => {});
    localStorage.removeItem("studynest_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
