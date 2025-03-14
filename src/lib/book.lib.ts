"use server";

import { IBook } from "@/interfaces/book.interface";
import api from "./api";

import { config } from "./config";
import { getCookie } from "./auth.lib";


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
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
    
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
