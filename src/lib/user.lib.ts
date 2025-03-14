"use server";

import api from "./api";

import { config } from "./config";
import { ICreateUser, IUpdateUser } from "@/interfaces/user.interface";

export const getOneUser = async (uuid: string) => {
  try {
    const response = await api.get(config.apiURL + "/users/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user: ICreateUser) => {
  try {
    const response = await api.post(config.apiURL + "/users", user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (uuid: string, user: IUpdateUser) => {
  try {
    const response = await api.patch(config.apiURL + "/users/" + uuid, user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/users/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
