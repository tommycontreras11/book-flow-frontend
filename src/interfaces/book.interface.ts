import { StatusEnum } from "@/enums/common.enum";
import { IBibliographyType } from "./bibliography-type.interface";
import { ILanguage } from "./language.interface";
import { IPublisher } from "./publisher.interface";
import { IScience } from "./science.interface";

export interface IBook {
  uuid: string;
  description: string;
  topographical_signature: string;
  isbn: string;
  publication_year: number;
  publisher: IPublisher;
  language: ILanguage;
  science: IScience;
  bibliographyType: IBibliographyType;
  status: StatusEnum;
}

export interface ICreateBook extends Partial<Omit<IBook, "uuid" | "language" | "science" | "bibliographyType" | "publisher" | "status">> { 
  bibliography_type_id: number;
  publisher_id: number;
  language_id: number;
  science_id: number;
}

export interface IUpdateBook extends Partial<ICreateBook> { }
