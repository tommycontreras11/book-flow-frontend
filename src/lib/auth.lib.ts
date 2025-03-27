"use server";

import api from "./api";

import { IAuth, IMeUser } from "@/interfaces/auth.interface";
import { cookies } from "next/headers";
import { config } from "./config";
import { handleApiError } from "@/utils/error";

export const signIn = async (auth: IAuth) => {
  try {
    const response = await api.post(config.apiURL + "/auth/signIn", auth);
    await saveCookie(response.data.originalToken);
  } catch (error: any) {
    throw new Error(handleApiError(error).message);
  }
};

export const signOut = async () => {
  try {
    const response = await api.post(config.apiURL + "/auth/signOut");
    await deleteCookie();
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const me = async (): Promise<IResponse<IMeUser>> => {
  try {
    const response = await api.get(config.apiURL + "/auth/me");
    return response.data;
  } catch (error: any) {
    return error;
  }
};

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
