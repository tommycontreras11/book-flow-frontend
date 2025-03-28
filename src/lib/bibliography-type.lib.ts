"use server";

import api from "./api";

import {
  ICreateBibliographyType,
  IUpdateBibliographyType
} from "@/interfaces/bibliography-type.interface";
import { config } from "./config";
import { handleApiError } from "@/utils/error";

export const createBibliographyType = async (
  bibliographyType: ICreateBibliographyType
) => {
  try {
    const response = await api.post(
      config.apiURL + "/bibliography-types",
      bibliographyType
    );
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
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
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const deleteBibliographyType = async (uuid: string) => {
  try {
    const response = await api.delete(
      config.apiURL + "/bibliography-types/" + uuid
    );
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};
