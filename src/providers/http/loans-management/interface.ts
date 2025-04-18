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
  due_date_progress: number;
  status: LoanManagementEnum;
}

export interface ILoanManagementFilter {
  bibliography_type?: string;
  language?: string;
  date_loan?: string;
  date_return?: string;
}

export interface ICreateLoanManagement {
  requestUUID: string;
  date_return: Date;
  comment: string | null;
}

export interface IUpdateLoanManagement extends Partial<ICreateLoanManagement> {
  status: LoanManagementEnum;
}
