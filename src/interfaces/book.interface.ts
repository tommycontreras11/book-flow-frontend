import { StatusEnum } from "@/enums/common.enum";
import { IBibliographyType } from "./bibliography-type.interface";
import { ILanguage } from "./language.interface";
import { IPublisher } from "./publisher.interface";
import { IScience } from "./science.interface";

export interface IBook {
  uuid: string;
  name: string;
  topographicalSignature: string;
  isbn: string;
  publicationYear: number;
  publisher: IPublisher;
  publisherName: string,
  language: ILanguage;
  languageName: string,
  science: IScience;
  scienceDescription: string,
  bibliographyType: IBibliographyType;
  bibliographyTypeName: string,
  status: StatusEnum;
}

export interface ICreateBook extends Partial<Omit<IBook, "uuid" | "language" | "languageName" | "science" | "scienceDescription" | "bibliographyType" | "bibliographyTypeName" | "publisher" | "publisherName" | "status">> { 
  bibliographyTypeUUID: string;
  publisherUUID: string;
  languageUUID: string;
  scienceUUID: string;
  authorUUIDs: string[];
}

export interface IUpdateBook extends Partial<ICreateBook> { }
