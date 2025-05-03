import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IComment } from "./interface";

export class CommentsProvider extends Base {
  constructor() {
    super(`${config.apiURL}/comments`);
  }

  public getAll(): Promise<IResponse<IComment[]>> {
    return this.get("");
  }

  public getOne(uuid?: string): Promise<IResponse<IComment>> {
    return this.get(`/${uuid}`);
  }

  public getOneByBook(uuid?: string): Promise<IResponse<IComment>> {
    return this.get(`/${uuid}/book`);
  }

  public create(data: FormData) {
    return this.post(
      "",
      data,
      {},
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  public update(data: FormData, uuid?: string) {
    return this.patch(`/${uuid}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  public destroy(uuid?: string) {
    return this.delete(`/${uuid}`);
  }
}

const commentsProvider = new CommentsProvider();

export default commentsProvider;
