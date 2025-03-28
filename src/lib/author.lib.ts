"use server";

import api from "./api";

import { ICreateAuthor, IUpdateAuthor } from "@/interfaces/author.interface";
import { config } from "./config";
import { handleApiError } from "@/utils/error";

export const createAuthor = async (author: ICreateAuthor) => {
  try {
    const response = await api.post(config.apiURL + "/authors", author);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const updateAuthor = async (uuid: string, author: IUpdateAuthor) => {
  try {
    const response = await api.patch(
      config.apiURL + "/authors/" + uuid,
      author
    );
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const deleteAuthor = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/authors/" + uuid);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};