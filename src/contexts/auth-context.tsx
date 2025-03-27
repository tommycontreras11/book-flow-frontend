"use client";

import { formSchema } from "@/app/(auth)/auth/signIn/page";
import { useMe } from "@/hooks/api/auth.hook";
import { IMeUser } from "@/interfaces/auth.interface";
import { getCookie, me, signIn, signOut } from "@/lib/auth.lib";
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
import { z } from "zod";

// Define a proper context type
interface AuthContextType {
  isLoggedIn: boolean;
  user?: IMeUser | null;
  setUser: Dispatch<SetStateAction<IMeUser | null>>;
  login: (values: z.infer<typeof formSchema>) => void;
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

  const login = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn(values);
      const { data }: { data: IMeUser } = await me();
      setUser(data);
      setIsLoggedIn(true);
      router.push("/");
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  };

  const logout = () => {
    console.log("Logging out...");
    signOut()
      .then(() => {
        setUser(null);
        setIsLoggedIn(false);
        window.location.replace("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setUser, user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
