import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ILanguage } from "./interface";

class LanguagesProvider extends Base {
    constructor() {
        super(`${config.apiURL}/languages`)
    }

    public getAll(): Promise<IResponse<ILanguage[]>> {
        return this.get('/');
    }

    public getOne(uuid: string): Promise<IResponse<ILanguage>> {
        return this.get(`/${uuid}`);
    }
}

const languagesProvider = new LanguagesProvider();

export default languagesProvider