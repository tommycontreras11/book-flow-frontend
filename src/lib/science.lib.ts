"use server";

import api from "./api";

import { ICreateScience, IUpdateScience } from "@/interfaces/science.interface";
import { config } from "./config";
import { handleApiError } from "@/utils/error";

export const createScience = async (payload: ICreateScience) => {
  try {
    const response = await api.post(config.apiURL + "/sciences", payload);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const updateScience = async (uuid: string, science: IUpdateScience) => {
  try {
    const response = await api.patch(
      config.apiURL + "/sciences/" + uuid,
      science
    );
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const deleteScience = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/sciences/" + uuid);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};
