import { StatusEnum } from "@/enums/common.enum";
import { IBook } from "../books/interface";
import { IUser } from "../users/interface";

export interface IComment {
  uuid: string;
  content: string;
  book: IBook;
  user: IUser;
  parentComment?: IComment;
  replies?: IComment[];
  url?: string;
  createdAt: Date;
  status: StatusEnum
}

export interface ICreateComment {
  content: string;
  bookUUID: string;
  userUUID: string;
  parentCommentUUID?: string;
  file: File;
}

export interface IUpdateComment extends Partial<ICreateComment> {}
