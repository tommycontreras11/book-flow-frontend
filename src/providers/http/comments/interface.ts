import { StatusEnum } from "@/enums/common.enum";
import { IBook } from "../books/interface";
import { IUser } from "../users/interface";

export interface IComment {
  uuid: string;
  content: string;
  book: IBook;
  user: IUser;
  url?: string;
  replies?: IComment[];
  totalComments: number;
  status: StatusEnum
  createdAt: Date;
}

export interface ICreateComment {
  content: string;
  bookUUID: string;
  userUUID: string;
  parentCommentUUID?: string;
  file: File;
}

export interface IUpdateComment extends Partial<ICreateComment> {}
