import { IPublisher } from "@/interfaces/publisher.interface";
import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICreatePublisher, IUpdatePublisher } from "./interface";

class PublishersProvider extends Base {
  constructor() {
    super(`${config.apiURL}/publishers`);
  }

  public getAll(): Promise<IResponse<IPublisher[]>> {
    return this.get("/");
  }

  public getOne(uuid: string): Promise<IResponse<IPublisher>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreatePublisher) {
    return this.post("/", data);
  }

  public update(uuid: string, data: IUpdatePublisher) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const publishersProvider = new PublishersProvider();

export default publishersProvider;
