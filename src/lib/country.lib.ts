"use server";

import api from "./api";

import { config } from "./config";

export const getAllCountries = async () => {
  try {
    const response = await api.get(config.apiURL + "/countries");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneCountry = async (uuid: string) => {
  try {
    const response = await api.get(config.apiURL + "/countries/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
