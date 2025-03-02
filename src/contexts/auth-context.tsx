"use client";

import { formSchema } from "@/app/(auth)/auth/signIn/page";
import { IMeUser } from "@/interfaces/auth.interface";
import { getCookie, me, signIn, signOut } from "@/lib/auth.lib";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
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
  const router = useRouter();

  useEffect(() => {
    const validateUser = async () => {
      const cookie = await getCookie();
      if (cookie) {
        me()
        .then(({ data }: { data: IMeUser }) => {
          setUser(data);
            setIsLoggedIn(true);
          })
          .catch((err) => console.log(err));
      }
    };

    validateUser();
  }, [])

  const login = (values: z.infer<typeof formSchema>) => {
    console.log("Logging in...");
    signIn(values)
      .then(() => {
        me()
        .then(({ data }: { data: IMeUser }) => {
          setUser(data);
            setIsLoggedIn(true);
            router.push("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
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
      {children}
    </AuthContext.Provider>
  );
}
