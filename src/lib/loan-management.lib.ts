"use server";

import api from "./api";

import {
  ICreateLoanManagement,
  ILoanManagementFilter,
  IUpdateLoanManagement,
} from "@/interfaces/loan-management.interface";
import { config } from "./config";

export const getAllLoanManagement = async (filters: ILoanManagementFilter) => {
  try {
    let filtersString = appendFilterString(filters);
    const response = await api.get(
      config.apiURL + "/loan-managements/" + filtersString
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const appendSignFilterString = async (filter?: string) => {
  return filter !== null ? "&" : "?";
};

const appendFilterString = async (
  filters: ILoanManagementFilter,
  filtersString?: string
) => {
  filters?.bibliographyType &&
    (filtersString += `?bibliography_type=${
      filters.bibliographyType
    }${appendSignFilterString(filters?.language)}`);
  filters?.language &&
    (filtersString += `${appendSignFilterString(
      filters?.bibliographyType
    )}language=${filters.language}${appendSignFilterString(
      filters?.dateLoan
    )}}`);
  filters?.dateLoan &&
    (filtersString += `${appendSignFilterString(filters?.language)}dateLoan=${
      filters.dateLoan
    }${appendSignFilterString(filters?.dateReturn)}`);
  filters?.dateReturn &&
    (filtersString += `${appendSignFilterString(filters?.dateLoan)}dateReturn=${
      filters.dateReturn
    }`);

  return filtersString;
};

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
