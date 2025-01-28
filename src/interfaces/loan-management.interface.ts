import { LoanManagementEnum } from "@/enums/loan-management.enum";
import { IRequest } from "./request.interface";

export interface ILoanManagement {
  uuid: string;
  loan_number: string;
  date_loan: string;
  date_return: string;
  amount_day: number;
  quantity_day: number;
  comment: string;
  request: IRequest;
  status: LoanManagementEnum;
}

export interface ICreateLoanManagement extends Partial<Omit<ILoanManagement, "uuid" | "loan_number" | "quantity_day" | "amount_day" | "status">> { 
  request_id: number;
}

export interface IUpdateLoanManagement extends Partial<ICreateLoanManagement> { }

export interface ILoanManagementFilter {
  bibliographyType?: string;
  language?: string;
  dateLoan?: string;
  dateReturn?: string;
}
