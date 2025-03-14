import { PersonTypeEnum, StatusEnum } from "@/enums/common.enum";

export interface IUser {
  uuid: string;
  name: string;
  email: string;
  password: string;
  identification: string;
  carnet_number: string;
  person_type: PersonTypeEnum;
  status: StatusEnum;
}

export interface ICreateUser extends Partial<Omit<IUser, "uuid" | "carnet_number" | "status">> { }

export interface IUpdateUser extends Partial<ICreateUser> {}
