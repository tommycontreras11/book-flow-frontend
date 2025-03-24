import { StatusEnum } from "@/enums/common.enum";
import { IBibliographyType } from "@/interfaces/bibliography-type.interface";
import { ILanguage } from "@/interfaces/language.interface";
import { IPublisher } from "@/interfaces/publisher.interface";
import { IRequest } from "@/interfaces/request.interface";
import { IScience } from "@/interfaces/science.interface";
import { IAuthor } from "../authors/interface";
import { BookQuickStatsEnum, BookRecentActivitiesEnum } from "@/enums/book.enum";

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

export interface IBookStats {
  quickStats: IQuickStats[];
  recentActivities: IRecentActivity[];
  topBorrowedBooks: ITopBorrowedBooks[]
}

export interface IQuickStats {
  title?: string;
  value?: number;
  type: BookQuickStatsEnum;
}

export interface IRecentActivity {
  title?: string;
  date: string;
  type: BookRecentActivitiesEnum;
}

export interface ITopBorrowedBooks {
  title: string;
  count: number;
}

export interface ICreateBook extends Partial<Omit<IBook, "uuid" | "language" | "science" | "bibliographyType" | "publisher" | "status" | "requests">> { 
  bibliographyTypeUUID: string;
  publisherUUID: string;
  languageUUID: string;
  scienceUUID: string;
  authorUUIDs: string[];
}

export interface IUpdateBook extends Partial<ICreateBook> { }
