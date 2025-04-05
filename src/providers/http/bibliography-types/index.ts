import { 
    IBibliographyType, 
    ICreateBibliographyType, 
    IUpdateBibliographyType 
} from "./interface";
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

    public create(data: ICreateBibliographyType) {
        return this.post('/', data)
    }

    public update(uuid: string, data: IUpdateBibliographyType) {
        return this.patch(`/${uuid}`, data)
    }

    public destroy(uuid: string) {
        return this.delete(`/${uuid}`)
    }
}

const bibliographyTypesProvider = new BibliographyTypesProvider()

export default bibliographyTypesProvider