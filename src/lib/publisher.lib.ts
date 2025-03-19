"use server";

import api from "./api";

import {
  ICreatePublisher,
  IUpdatePublisher
} from "@/interfaces/publisher.interface";
import { config } from "./config";

export const createPublisher = async (publisher: ICreatePublisher) => {
  try {
    const response = await api.post(config.apiURL + "/publishers", publisher);
    return response.data;
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

export const deletePublisher = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/publishers/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
