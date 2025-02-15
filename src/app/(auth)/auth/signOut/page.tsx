"use client";

import { signOut } from "@/lib/auth.lib";
import { useEffect } from "react";

export default function SignOut() {
  useEffect(() => {
    signOut()
      .then(() => {
        window.location.replace("/"); 
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>Signing you out...</div>; 
}