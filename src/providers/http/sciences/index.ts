import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IScience } from "./interface";

class SciencesProvider extends Base {
    constructor() {
        super(`${config.apiURL}/sciences`)
    }

    public getAll(): Promise<IResponse<IScience[]>> {
        return this.get('/')
    }

    public getOne(uuid: string): Promise<IResponse<IScience>> {
        return this.get(`/${uuid}`)
    }
}

const sciencesProvider = new SciencesProvider()

export default sciencesProvider