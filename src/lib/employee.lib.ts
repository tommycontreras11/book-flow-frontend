"use server";

import { ICreateEmployee, IUpdateEmployee } from "@/providers/http/employees/interface";
import api from "./api";

import { config } from "./config";
import { handleApiError } from "@/utils/error";

export const createEmployee = async (employee: ICreateEmployee) => {
  try {
    const response = await api.post(config.apiURL + "/employees", employee);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const updateEmployee = async (
  uuid: string,
  employee: IUpdateEmployee
) => {
  try {
    const response = await api.patch(
      config.apiURL + "/employees/" + uuid,
      employee
    );
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};

export const deleteEmployee = async (uuid: string) => {
  try {
    const response = await api.delete(config.apiURL + "/employees/" + uuid);
    return response.data;
  } catch (err) {
    throw new Error(handleApiError(err).message);
  }
};
