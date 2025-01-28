import { StatusEnum } from "@/enums/common.enum";

export interface IPublisher {
  uuid: string;
  description: string;
  status: StatusEnum;
}

export interface ICreatePublisher extends Partial<Omit<IPublisher, "uuid" | "status">> { }

export interface IUpdatePublisher extends Partial<IPublisher> { }
