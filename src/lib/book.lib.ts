"use server";

import { handleApiError } from "@/utils/error";
import api from "./api";

import { config } from "./config";

export const createBook = async (book: FormData) => {
  try {
    const response = await api.post(config.apiURL + "/books", book, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const updateBook = async (uuid: string, book: FormData) => {
  try {
    const response = await api.patch(config.apiURL + "/books/" + uuid, book, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const deleteBook = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/books/" + uuid);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};
