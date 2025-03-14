import { StatusEnum } from "@/enums/common.enum";
import { IBibliographyType } from "./bibliography-type.interface";
import { ILanguage } from "./language.interface";
import { IPublisher } from "./publisher.interface";
import { IScience } from "./science.interface";
import { IRequest } from "./request.interface";
import { IAuthor } from "./author.interface";

export interface IBook {
  uuid: string;
  name: string;
  topographicalSignature: string;
  isbn: string;
  publicationYear: number;
  publisher: IPublisher;
  language: ILanguage;
  science: IScience;
  bibliographyType: IBibliographyType;
  requests: IRequest[];
  authors: IAuthor[]
  status: StatusEnum;
  url: string;
  file: File
}

export interface ICreateBook extends Partial<Omit<IBook, "uuid" | "language" | "languageName" | "science" | "scienceDescription" | "bibliographyType" | "bibliographyTypeName" | "publisher" | "publisherName" | "status" | "requests">> { 
  bibliographyTypeUUID: string;
  publisherUUID: string;
  languageUUID: string;
  scienceUUID: string;
  authorUUIDs: string[];
}

export interface IUpdateBook extends Partial<ICreateBook> { }
