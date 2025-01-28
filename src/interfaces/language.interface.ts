import { StatusEnum } from "@/enums/common.enum";

export interface ILanguage {
  uuid: string;
  description: string;
  status: StatusEnum;
}
