"use server";

import api from "./api";

import {
  ICreateBibliographyType,
  IUpdateBibliographyType
} from "@/interfaces/bibliography-type.interface";
import { config } from "./config";

export const createBibliographyType = async (
  bibliographyType: ICreateBibliographyType
) => {
  try {
    const response = await api.post(
      config.apiURL + "/bibliography-types",
      bibliographyType
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateBibliographyType = async (
  uuid: string,
  bibliographyType: IUpdateBibliographyType
) => {
  try {
    const response = await api.patch(
      config.apiURL + "/bibliography-types/" + uuid,
      bibliographyType
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBibliographyType = async (uuid: string) => {
  try {
    const response = await api.delete(
      config.apiURL + "/bibliography-types/" + uuid
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
