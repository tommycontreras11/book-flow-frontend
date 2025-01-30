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
  userUUID: number;
  bookUUID: number;
}

export interface IUpdateRequest extends Partial<ICreateRequest> { }