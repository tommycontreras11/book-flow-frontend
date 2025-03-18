import { StatusEnum } from "@/enums/common.enum";

export interface ICountry {
  uuid: string;
  name: string;
  status: StatusEnum;
}

export interface ICreateCountry extends Partial<Omit<ICountry, "uuid" | "status">> { }

export interface IUpdateCountry extends Partial<ICreateCountry> { }