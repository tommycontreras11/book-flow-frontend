import { StatusEnum } from "@/enums/common.enum";
import { IUser } from "@/interfaces/user.interface";

export interface IEmployee {
  uuid: string;
  name: string;
  email: string;
  password: string;
  identification: string;
  work_shift: string;
  commission_percentage: number;
  entry_date: string;
  status: StatusEnum;
}

export interface ICreateEmployee extends Partial<Omit<IEmployee, "uuid" | "status">> { }

export interface IUpdateEmployee extends Partial<ICreateEmployee> { }
