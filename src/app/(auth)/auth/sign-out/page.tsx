"use client";

import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";

export default function SignOut() {
    const { logout } = useAuth();
  
  useEffect(() => {
    logout();
  }, []);

  return <div>Signing you out...</div>; 
}