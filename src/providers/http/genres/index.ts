import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICreateGenre, IGenre, IUpdateGenre } from "./interface";

class GenresProvider extends Base {
  constructor() {
    super(`${config.apiURL}/genres`);
  }

  public getAll(): Promise<IResponse<IGenre[]>> {
    return this.get("/");
  }

  public getOne(uuid?: string): Promise<IResponse<IGenre>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreateGenre) {
    return this.post("/", data);
  }

  public update(uuid: string, data: IUpdateGenre) {
    return this.post(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const genresProvider = new GenresProvider();

export default genresProvider;
