import { StatusEnum } from "@/enums/common.enum";
import { ILanguage } from "./language.interface";
import { ICountry } from "./country.interface";

export interface IAuthor {
  uuid: string;
  name: string;
  birthCountry: ICountry;
  birthCountryName: string;
  nativeLanguage: ILanguage;
  nativeLanguageDescription: string;
  status: StatusEnum;
}

export interface ICreateAuthor extends Partial<Omit<IAuthor, "uuid" | "birthCountry" | "nativeLanguage" | "birthCountryName" | "nativeLanguageDescription" | "status">> { 
  birthCountryUUID: number;
  nativeLanguageUUID: number;
}

export interface IUpdateAuthor extends Partial<ICreateAuthor> { }
