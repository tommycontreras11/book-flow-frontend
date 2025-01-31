import { StatusRequestEnum } from "@/enums/request.enum";
import { IBook } from "./book.interface";
import { IUser } from "./user.interface";

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

export interface IUpdateRequest extends Partial<ICreateRequest> { }

export interface IUpdateRequestEmployeeStatus {
  requestUUID: string;
  employeeUUID: string;
  status: StatusRequestEnum;
}