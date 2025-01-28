import { StatusEnum } from "@/enums/common.enum";

export interface IScience {
  uuid: string;
  description: string;
  status: StatusEnum;
}

export interface ICreateScience extends Partial<Omit<IScience, "uuid" | "status">> { }

export interface IUpdateScience extends Partial<IScience> { }
