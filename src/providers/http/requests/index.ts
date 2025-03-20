import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IRequest } from "./interface";
import { StatusRequestEnum } from "@/enums/request.enum";

class RequestsProvider extends Base {
    constructor() {
        super(`${config.apiURL}/requests`);
    }

    public getAll(status?: StatusRequestEnum[]): Promise<IResponse<IRequest[]>> {
        return this.get(`/${status ? `?status=${status}` : ""}`);
    }

    public getOne(uuid: string): Promise<IResponse<IRequest>> {
        return this.get(`/${uuid}`);
    }
}

const requestsProvider = new RequestsProvider();

export default requestsProvider;