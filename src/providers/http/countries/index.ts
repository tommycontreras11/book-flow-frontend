import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICountry, ICreateCountry, IUpdateCountry } from "./interface";

class CountryProvider extends Base {
  constructor() {
    super(`${config.apiURL}/countries`);
  }

  public getAll(): Promise<IResponse<ICountry[]>> {
    return this.get("/");
  }

  public getOne(uuid: string): Promise<IResponse<ICountry>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreateCountry) {
    return this.post("/", data);
  }

  public update(uuid: string, data: IUpdateCountry) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const countriesProvider = new CountryProvider();

export default countriesProvider;
