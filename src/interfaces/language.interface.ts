import { StatusEnum } from "@/enums/common.enum";

export interface ILanguage {
  uuid: string;
  description: string;
  status: StatusEnum;
}

export interface ICreateLanguage extends Partial<Omit<ILanguage, "uuid" | "status">> { }

export interface IUpdateLanguage extends Partial<ILanguage> { }
