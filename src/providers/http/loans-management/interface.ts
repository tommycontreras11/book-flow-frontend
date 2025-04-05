import { LoanManagementEnum } from "@/enums/loan-management.enum";
import { IRequest } from "../requests/interface";

export interface ILoanManagement {
  uuid: string;
  loan_number: string;
  date_loan: Date;
  date_return: Date;
  amount_day: number;
  quantity_day: number;
  comment: string | null;
  request: IRequest;
  status: LoanManagementEnum;
}

export interface ICreateLoanManagement extends Partial<Omit<ILoanManagement, "uuid" | "loan_number" | "date_loan" | "quantity_day" | "amount_day" | "request" | "status">> { 
  requestUUID: string;
}

export interface IUpdateLoanManagement extends Partial<ICreateLoanManagement> { }

export interface ILoanManagementFilter {
  bibliographyType?: string;
  language?: string;
  dateLoan?: string;
  dateReturn?: string;
}
