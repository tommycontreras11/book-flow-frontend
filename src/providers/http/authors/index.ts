import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IAuthor, ICreateAuthor, IUpdateAuthor } from "./interface";

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

    public create(data: ICreateAuthor) {
        return this.post('/', data)
    }

    public update(uuid: string, data: IUpdateAuthor) {
        return this.patch(`/${uuid}`, data)
    }

    public destroy(uuid: string) {
        return this.delete(`/${uuid}`)
    }
}

const authorsProvider = new AuthorsProvider()

export default authorsProvider