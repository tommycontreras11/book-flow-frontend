"use server";

import api from "./api";

import { config } from "./config";

export const getAllBook = async () => {
  try {
    const response = await api.get(config.apiURL + "/books");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneBook = async (uuid: string) => {
  try {
    const response = await api.get(config.apiURL + "/books/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createBook = async (book: FormData) => {
  try {
    const response = await api.post(config.apiURL + "/books", book, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateBook = async (uuid: string, book: FormData) => {
  try {
    const response = await api.patch(config.apiURL + "/books/" + uuid, book, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/books/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
