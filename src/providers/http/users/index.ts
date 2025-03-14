import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IUser } from "./interface";

class UsersProvider extends Base {
    constructor() {
        super(`${config.apiURL}/users`)
    }

    public getAll(): Promise<IResponse<IUser[]>> {
        return this.get('/');
    }

    public getOne(uuid: string): Promise<IResponse<IUser>> {
        return this.get(`/${uuid}`);
    }
}

const usersProvider = new UsersProvider()

export default usersProvider