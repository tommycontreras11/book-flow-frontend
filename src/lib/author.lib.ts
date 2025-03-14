"use server";

import api from "./api";

import { ICreateAuthor, IUpdateAuthor } from "@/interfaces/author.interface";
import { config } from "./config";

export const getOneAuthor = async (uuid: string) => {
  try {
    const response = await api.get(config.apiURL + "/authors/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createAuthor = async (author: ICreateAuthor) => {
  try {
    const response = await api.post(config.apiURL + "/authors", author);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAuthor = async (uuid: string, author: IUpdateAuthor) => {
  try {
    const response = await api.patch(
      config.apiURL + "/authors/" + uuid,
      author
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAuthor = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/authors/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};