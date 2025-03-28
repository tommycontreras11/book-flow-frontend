"use server";

import { handleApiError } from "@/utils/error";
import api from "./api";

import { config } from "./config";
import { ICreateUser, IUpdateUser } from "@/interfaces/user.interface";

export const createUser = async (user: ICreateUser) => {
  try {
    const response = await api.post(config.apiURL + "/users", user);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const updateUser = async (uuid: string, user: IUpdateUser) => {
  try {
    const response = await api.patch(config.apiURL + "/users/" + uuid, user);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const deleteUser = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/users/" + uuid);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};
