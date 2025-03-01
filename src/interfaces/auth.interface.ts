import { StatusEnum, UserRoleEnum } from "@/enums/common.enum";

export interface IAuth {
  email: string;
  password: string;
}

export interface IMeUser {
  uuid: string;
  name: string;
  email: string;
  status: StatusEnum;
  role: UserRoleEnum;
}