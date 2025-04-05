import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICreateScience, IScience, IUpdateScience } from "./interface";

class SciencesProvider extends Base {
  constructor() {
    super(`${config.apiURL}/sciences`);
  }

  public getAll(): Promise<IResponse<IScience[]>> {
    return this.get("/");
  }

  public getOne(uuid: string): Promise<IResponse<IScience>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreateScience) {
    return this.post("/", data);
  }

  public update(uuid: string, data: IUpdateScience) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const sciencesProvider = new SciencesProvider();

export default sciencesProvider;
