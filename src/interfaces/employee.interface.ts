import { IUser } from "./user.interface";

export interface IEmployee extends Partial<Omit<IUser, "carnet_number" | "person_type">> {
  work_shift: string;
  commission_percentage: number;
  entry_date: Date;
}

export interface ICreateEmployee extends Partial<Omit<IEmployee, "uuid" | "status">> { }

export interface IUpdateEmployee extends Partial<ICreateEmployee> { }
