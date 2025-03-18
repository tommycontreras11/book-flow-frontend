import { StatusEnum } from "@/enums/common.enum";
import { ICountry } from "@/interfaces/country.interface";
import { ILanguage } from "@/interfaces/language.interface";

export interface IAuthor {
  uuid: string;
  name: string;
  birthCountry: ICountry;
  nativeLanguage: ILanguage;
  status: StatusEnum;
}

export interface ICreateAuthor
  extends Partial<
    Omit<IAuthor, "uuid" | "birthCountry" | "nativeLanguage" | "status">
  > {
  birthCountryUUID: string;
  nativeLanguageUUID: string;
}

export interface IUpdateAuthor extends Partial<ICreateAuthor> {}
