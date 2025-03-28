"use server";

import api from "./api";

import {
  ICreatePublisher,
  IUpdatePublisher
} from "@/interfaces/publisher.interface";
import { config } from "./config";
import { handleApiError } from "@/utils/error";

export const createPublisher = async (publisher: ICreatePublisher) => {
  try {
    const response = await api.post(config.apiURL + "/publishers", publisher);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const updatePublisher = async (
  uuid: string,
  publisher: IUpdatePublisher
) => {
  try {
    const response = await api.patch(
      config.apiURL + "/publishers/" + uuid,
      publisher
    );
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const deletePublisher = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/publishers/" + uuid);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};
