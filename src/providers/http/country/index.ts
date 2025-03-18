import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICountry } from "./interface";

class CountryProvider extends Base {
    constructor() {
        super(`${config.apiURL}/countries`)
    }

    public getAll(): Promise<IResponse<ICountry[]>> {
        return this.get('/');
    }

    public getOne(uuid: string): Promise<IResponse<ICountry>> {
        return this.get(`/${uuid}`);
    }
}

const countryProvider = new CountryProvider()

export default countryProvider