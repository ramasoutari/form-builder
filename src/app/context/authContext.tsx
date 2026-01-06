"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useLogin } from "../api/auth/auth.api";
import { IUser } from "../lib/types/user";

interface AuthContextType {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const uselogin = useLogin();
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (email: string, password: string) => {
   const respone=  await uselogin.mutateAsync({
      email,
      password,
    });

    console.log("respone",respone)

    setUser(respone.user)
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
