"use server";

import api from "./api";

import { config } from "./config";
import { ICreateScience, IUpdateScience } from "@/interfaces/science.interface";

export const getAllScience = async () => {
  try {
    const response = await api.get(config.apiURL + "/sciences");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneScience = async (uuid: string) => {
  try {
    const response = await api.get(config.apiURL + "/sciences/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createScience = async (science: ICreateScience) => {
  try {
    const response = await api.post(config.apiURL + "/sciences", science);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateScience = async (uuid: string, science: IUpdateScience) => {
  try {
    const response = await api.patch(
      config.apiURL + "/sciences/" + uuid,
      science
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteScience = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/sciences/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
