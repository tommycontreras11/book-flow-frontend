"use server";

import api from "./api";

import { config } from "./config";
import {
  ICreatePublisher,
  IPublisher,
  IUpdatePublisher,
} from "@/interfaces/publisher.interface";

export const getAllPublisher = async (): Promise<ResponseI<IPublisher[]>> => {
  try {
    const response = await api.get(config.apiURL + "/publishers");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOnePublisher = async (uuid: string) => {
  try {
    const response = await api.get(config.apiURL + "/publishers/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

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
