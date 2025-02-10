import { StatusEnum } from "@/enums/common.enum";

export interface IBibliographyType {
  uuid: string;
  name: string;
  status: StatusEnum;
}

export interface ICreateBibliographyType extends Partial<Omit<IBibliographyType, "uuid" | "status">> { }

export interface IUpdateBibliographyType extends Partial<IBibliographyType> { }
