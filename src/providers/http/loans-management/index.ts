import { config } from "@/lib/config";
import Base from "@/providers/base";
import {
  ICreateLoanManagement,
  ILoanManagement,
  ILoanManagementFilter,
  IUpdateLoanManagement,
} from "./interface";
import { appendFilterString } from "@/utils/loan";

class LoansManagementProvider extends Base {
  constructor() {
    super(`${config.apiURL}/loans-management`);
  }

  public getAll(
    filters?: ILoanManagementFilter
  ): Promise<IResponse<ILoanManagement[]>> {
    let filtersString = appendFilterString(filters);
    return this.get(`/${filtersString != undefined ? filtersString : ""}`);
  }

  public getOne(
    uuid?: string,
  ): Promise<IResponse<ILoanManagement>> {
    return this.get(`/${uuid}`);
  }

  public create({ requestUUID, ...data }: Partial<ICreateLoanManagement>) {
    return this.post(`/${requestUUID}`, data);
  }

  public update(uuid: string, data: Partial<IUpdateLoanManagement>) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const loansManagementProvider = new LoansManagementProvider();

export default loansManagementProvider;
