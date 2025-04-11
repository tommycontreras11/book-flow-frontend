"use client";

import { useMe } from "@/hooks/api/auth.hook";
import { deleteCookie, me, saveCookie } from "@/lib/auth.lib";
import { useSignIn, useSignOut } from "@/mutations/api/auth";
import { useCreateUser } from "@/mutations/api/users";
import { IAuth, IMeUser } from "@/providers/http/auth/interface";
import { ICreateUser } from "@/providers/http/users/interface";
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

  const { mutate: createUser } = useCreateUser(() => {
    router.push("/auth/signIn");
  });

  const { mutate: signOut } = useSignOut(() => {
    deleteCookie().then(() => {
      setUser(null);
      setIsLoggedIn(false);
      window.location.replace("/");
    });
  });

  const { mutate: signIn } = useSignIn(async (data) => {
    await saveCookie(data?.originalToken)

    me().then((data) => {      
      setUser(data.data);
      setIsLoggedIn(true);
      router.push("/");
    });
  });

  useEffect(() => {
    if(isLoading) {
      setLoading(false)
      return;
    };

    const validateUser = async () => {
      if (data) {
        setUser(data);
        setIsLoggedIn(true);
      } else {
        setUser(null);
      }
    };

    validateUser();
  }, [isLoading]);

  const login = (values: IAuth) => {
    signIn(values);
  };

  const register = (values: ICreateUser) => {
    createUser(values);
  };

  const logout = () => {
    signOut(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setUser, user, login, register, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
