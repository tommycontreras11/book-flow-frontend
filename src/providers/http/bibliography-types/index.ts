import { IBibliographyType } from "./interface";
import { config } from "@/lib/config";
import Base from "@/providers/base";

class BibliographyTypesProvider extends Base {
    constructor() {
        super(`${config.apiURL}/bibliography-types`)
    }

    public getAll(): Promise<IResponse<IBibliographyType[]>> {
        return this.get('/');
    }

    public getOne(uuid: string): Promise<IResponse<IBibliographyType>> {
        return this.get(`/${uuid}`);
    }
}

const bibliographyTypesProvider = new BibliographyTypesProvider()

export default bibliographyTypesProvider