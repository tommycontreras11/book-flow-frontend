import { StatusEnum } from "@/enums/common.enum";

export interface IGenre {
  uuid: string;
  name: string;
  status: StatusEnum;
}

export interface ICreateGenre extends Omit<IGenre, "uuid"> {}

export interface IUpdateGenre extends ICreateGenre {}
