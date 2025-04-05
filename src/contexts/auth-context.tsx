"use client";

import { useMe } from "@/hooks/api/auth.hook";
import { IMeUser } from "@/interfaces/auth.interface";
import { me, signIn, signOut } from "@/lib/auth.lib";
import { createUser } from "@/lib/user.lib";
import { IAuth } from "@/providers/http/auth/interface";
import { ICreateUser } from "@/providers/http/users/interface";
import { handleApiError } from "@/utils/error";
import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// Define a proper context type
interface AuthContextType {
  isLoggedIn: boolean;
  user?: IMeUser | null;
  setUser: Dispatch<SetStateAction<IMeUser | null>>;
  login: (values: IAuth) => void;
  register: (values: ICreateUser) => void;
  logout: () => void;
}

// Create a context with `null` as the default value
const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IMeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { data, isLoading } = useMe();
  const router = useRouter();

  useEffect(() => {
    const validateUser = async () => {
      if (data) {
        setUser(data);
        setIsLoggedIn(true);
      } else {
        setLoading(false);
      }
    };

    validateUser();
  }, [data, isLoading]);

  const login = async (values: IAuth) => {
    try {
      await signIn(values);
      const { data }: { data: IMeUser } = await me();
      setUser(data);
      setIsLoggedIn(true);
      router.push("/");
    } catch (err) {
      throw new Error(handleApiError(err).message);
    }
  };

  const register = async (values: ICreateUser) => {
    try {
      await createUser(values);
      router.push("/auth/signIn");
    } catch (err) {
      throw new Error(handleApiError(err).message);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      window.location.replace("/");
    } catch (err) {
      throw new Error(handleApiError(err).message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setUser, user, login, register, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
