"use server";

import api from "./api";

import {
  ICreateLanguage,
  IUpdateLanguage
} from "@/interfaces/language.interface";
import { config } from "./config";

export const getOneLanguage = async (uuid: string) => {
  try {
    const response = await api.get(config.apiURL + "/languages/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createLanguage = async (language: ICreateLanguage) => {
  try {
    const response = await api.post(config.apiURL + "/languages", language);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateLanguage = async (
  uuid: string,
  language: IUpdateLanguage
) => {
  try {
    const response = await api.patch(
      config.apiURL + "/languages/" + uuid,
      language
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLanguage = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/languages/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
