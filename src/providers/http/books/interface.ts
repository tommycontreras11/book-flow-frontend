import { StatusEnum } from "@/enums/common.enum";
import { IAuthor } from "../authors/interface";
import { BookQuickStatsEnum, BookRecentActivitiesEnum } from "@/enums/book.enum";
import { IRequest } from "../requests/interface";
import { IPublisher } from "../publishers/interface";
import { ILanguage } from "../languages/interface";
import { IScience } from "../sciences/interface";
import { IBibliographyType } from "../bibliography-types/interface";
import { IGenre } from "../genres/interface";

export interface IBook {
  uuid: string;
  name: string;
  description: string;
  topographicalSignature: string;
  isbn: string;
  publishedDate: Date;
  pages: number;
  publisher: IPublisher;
  language: ILanguage;
  science: IScience;
  bibliographyType: IBibliographyType;
  requests: IRequest[];
  authors: IAuthor[]
  genres: IGenre[]
  status: StatusEnum;
  url: string;
  file: File
}

export interface IBookFilter {
  science?: string;
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
  genreUUIDs: string[];
}

export interface IUpdateBook extends Partial<ICreateBook> { }
