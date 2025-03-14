import { config } from "@/lib/config";
import Base from "../../base";
import { IBook } from "./interface";

class BooksProvider extends Base {
    constructor() {
        super(`${config.apiURL}/books`)
    }

    public getAll(): Promise<IResponse<IBook[]>> {
        return this.get('/');
    }

    public getOne(uuid: string): Promise<IResponse<IBook>> {
        return this.get(`/${uuid}`);
    }
}

const booksProvider = new BooksProvider();

export default booksProvider;