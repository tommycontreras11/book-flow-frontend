import { StatusEnum } from "@/enums/common.enum";

export interface IEmployee {
  uuid: string;
  name: string;
  email: string;
  password: string;
  identification: string;
  work_shift: string;
  commission_percentage: number;
  entry_date: Date;
  status: StatusEnum;
}

export interface ICreateEmployee extends Partial<Omit<IEmployee, "uuid" | "status">> { }

export interface IUpdateEmployee extends Partial<ICreateEmployee> { }
