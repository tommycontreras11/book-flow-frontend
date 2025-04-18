import { config } from "@/lib/config";
import Base from "../../base";
import { IBook, IBookStats } from "./interface";

class BooksProvider extends Base {
  constructor() {
    super(`${config.apiURL}/books`);
  }

  public getAll(search?: string | null): Promise<IResponse<IBook[]>> {
    return this.get(
      `/${!!search ? `?search=${search}` : ""}`
    );
  }

  public getStats(): Promise<IResponse<IBookStats>> {
    return this.get("/stats");
  }

  public getOne(uuid: string): Promise<IResponse<IBook>> {
    return this.get(`/${uuid}`);
  }

  public create(data: FormData) {
    return this.post(
      "/",
      data,
      {},
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  public update(uuid: string, data: FormData) {
    return this.patch(`/${uuid}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const booksProvider = new BooksProvider();

export default booksProvider;
