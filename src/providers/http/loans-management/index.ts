import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICreateLoanManagement } from "./interface";

class LoansManagementProvider extends Base {
  constructor() {
    super(`${config.apiURL}/loans-management`);
  }

  public create({ requestUUID, ...data }: ICreateLoanManagement) {
    return this.post(`/${requestUUID}`, data);
  }
}

const loansManagementProvider = new LoansManagementProvider();

export default loansManagementProvider;
