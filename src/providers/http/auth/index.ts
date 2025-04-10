import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IAuth, IMeUser } from "./interface";

class AuthProvider extends Base {
  constructor() {
    super(`${config.apiURL}/auth`);
  }

  public me(): Promise<IResponse<IMeUser>> {
    return this.get("/me");
  }

  public signIn(data: IAuth) {
    return this.post("/signIn", data);
  }

  public signOut() {
    return this.post("/signOut");
  }
}

const authProvider = new AuthProvider();

export default authProvider;