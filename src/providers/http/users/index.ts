import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICreateUser, IUpdateUser, IUser } from "./interface";

class UsersProvider extends Base {
  constructor() {
    super(`${config.apiURL}/users`);
  }

  public getAll(): Promise<IResponse<IUser[]>> {
    return this.get("/");
  }

  public getOne(uuid: string): Promise<IResponse<IUser>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreateUser) {
    return this.post("/", data);
  }

  public update(uuid: string, data: IUpdateUser) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const usersProvider = new UsersProvider();

export default usersProvider;
