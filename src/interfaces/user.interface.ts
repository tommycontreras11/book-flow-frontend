import { PersonTypeEnum, StatusEnum } from "@/enums/common.enum";

export interface IUser {
  uuid: string;
  name: string;
  username: string;
  identification: string;
  carnet_number: string;
  person_type: PersonTypeEnum;
  status: StatusEnum;
}

export interface ICreateUser extends Partial<Omit<IUser, "uuid" | "person_type" | "status">> { }

export interface IUpdateUser extends Partial<IUser> { }
