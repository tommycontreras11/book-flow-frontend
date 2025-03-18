import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IAuthor } from "./interface";

class AuthorsProvider extends Base {
    constructor() {
        super(`${config.apiURL}/authors`)
    }

    public getAll(): Promise<IResponse<IAuthor[]>> {
        return this.get('/')
    }

    public getOne(uuid: string): Promise<IResponse<IAuthor>> {
        return this.get(`/${uuid}`)
    }
}

const authorsProvider = new AuthorsProvider()

export default authorsProvider