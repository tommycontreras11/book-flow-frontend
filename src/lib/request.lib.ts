"use server";

import api from "./api";

import { StatusRequestEnum } from "@/enums/request.enum";
import {
  ICreateRequest,
  IUpdateRequest,
  IUpdateRequestEmployeeStatus,
} from "@/interfaces/request.interface";
import { config } from "./config";

export const getAllRequest = async (status?: StatusRequestEnum[]) => {
  try {
    const response = await api.get(
      `${config.apiURL}/requests${status ? `?status=${status}` : ""}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getOneRequest = async (uuid: string) => {
  try {
    const response = await api.get(config.apiURL + "/requests/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createRequest = async (request: ICreateRequest) => {
  try {
    const response = await api.post(config.apiURL + "/requests", request);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateRequest = async (uuid: string, request: IUpdateRequest) => {
  try {
    const response = await api.patch(
      config.apiURL + "/requests/" + uuid,
      request
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateRequestEmployeeStatus = async ({
  employeeUUID,
  requestUUID,
  status,
}: IUpdateRequestEmployeeStatus) => {
  try {
    const response = await api.patch(
      `${config.apiURL}/requests/${requestUUID}/employees/${employeeUUID}/status`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRequest = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/requests/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
