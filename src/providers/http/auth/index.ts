import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IMeUser } from "./interface";

class AuthProvider extends Base {
  constructor() {
    super(`${config.apiURL}/auth`);
  }

  public me(): Promise<IResponse<IMeUser>> {
    return this.get("/me");
  }
}

const authProvider = new AuthProvider();

export default authProvider;