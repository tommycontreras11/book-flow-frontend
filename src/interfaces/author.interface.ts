import { StatusEnum } from "@/enums/common.enum";
import { ILanguage } from "./language.interface";
import { ICountry } from "./country.interface";

export interface IAuthor {
  uuid: string;
  name: string;
  birthCountry: ICountry;
  nativeLanguage: ILanguage;
  status: StatusEnum;
}

export interface ICreateAuthor extends Partial<Omit<IAuthor, "uuid" | "birthCountry" | "nativeLanguage" | "status">> { 
  birth_country_id: number;
  native_language_id: number;
}

export interface IUpdateAuthor extends Partial<ICreateAuthor> { }
