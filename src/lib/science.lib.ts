"use server";

import api from "./api";

import { ICreateScience, IUpdateScience } from "@/interfaces/science.interface";
import { config } from "./config";

export const createScience = async ({ ...payload }: ICreateScience) => {
  try {
    const response = await api.post(config.apiURL + "/sciences", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error.message);
  }
};

export const updateScience = async (uuid: string, science: IUpdateScience) => {
  try {
    const response = await api.patch(
      config.apiURL + "/sciences/" + uuid,
      science
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteScience = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/sciences/" + uuid);
    return response.data;
  } catch (error) {
    throw error;
  }
};
