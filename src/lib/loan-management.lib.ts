"use server";

import api from "./api";

import {
  ICreateLoanManagement,
  IUpdateLoanManagement,
} from "@/interfaces/loan-management.interface";
import { config } from "./config";
import { ILoanManagementFilter } from "@/providers/http/loans-management/interface";

// export const getAllLoanManagement = async (filters: ILoanManagementFilter) => {
//   try {
//     let filtersString = await appendFilterString(filters);
//     const response = await api.get(
//       config.apiURL + "/loan-managements/" + filtersString
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getOneLoanManagement = async (uuid: string) => {
  try {
    const response = await api.get(config.apiURL + "/loan-managements/" + uuid);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createLoanManagement = async (
  { requestUUID, ...loanManagement }: ICreateLoanManagement
) => {
  try {
    console.log(requestUUID);
    const response = await api.post(
      `${config.apiURL}/loan-managements/${requestUUID}`,
      loanManagement
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error.message);
  }
};

export const updateLoanManagement = async (
  uuid: string,
  loanManagement: IUpdateLoanManagement
) => {
  try {
    const response = await api.patch(
      config.apiURL + "/loan-managements/" + uuid,
      loanManagement
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLoanManagement = async (uuid: string) => {
  try {
    const response = await api.delete(
      config.apiURL + "/loan-managements/" + uuid
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
