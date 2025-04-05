import { StatusRequestEnum } from "@/enums/request.enum";
import { IBook } from "../books/interface";
import { IUser } from "../users/interface";

export interface IRequest {
  uuid: string;
  book: IBook;
  user: IUser;
  status: StatusRequestEnum;
}

export interface ICreateRequest extends Partial<Omit<IRequest, "uuid" | "book" | "user" | "status">> { 
  userUUID: string;
  bookUUID: string;
}

export interface IUpdateRequest {
  status?: StatusRequestEnum;
  bookUUID?: string;
 }

export interface IUpdateRequestEmployeeStatus {
  employeeUUID: string;
  status: StatusRequestEnum;
}