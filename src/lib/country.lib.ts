"use server";

import { ICreateCountry, IUpdateCountry } from "@/interfaces/country.interface";
import api from "./api";

import { config } from "./config";
import { handleApiError } from "@/utils/error";

export const createCountry = async (author: ICreateCountry) => {
  try {
    const response = await api.post(config.apiURL + "/countries", author);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const updateCountry = async (uuid: string, author: IUpdateCountry) => {
  try {
    const response = await api.patch(
      config.apiURL + "/countries/" + uuid,
      author
    );
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const deleteCountry = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/countries/" + uuid);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};
