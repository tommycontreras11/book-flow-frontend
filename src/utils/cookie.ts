"use server";

import { cookies } from "next/headers";

const configCookie = {
  maxAge: 60 * 60 * 24,
  path: "/",
  domain: "localhost",
  httpOnly: true,
  secure: false,
};

export const saveCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("jwt", token, configCookie);
};

export const getCookie = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  return token;
};

export const deleteCookie = async (): Promise<void> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  token && cookieStore.delete("jwt");
};
