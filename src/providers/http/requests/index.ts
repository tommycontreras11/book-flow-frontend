import { config } from "@/lib/config";
import Base from "@/providers/base";
import {
  ICreateRequest,
  IRequest,
  IUpdateRequest,
  IUpdateRequestEmployeeStatus,
} from "./interface";
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

  public create(data: ICreateRequest) {
    return this.post("/", data);
  }

  public update(uuid: string, data: IUpdateRequest) {
    return this.patch(`/${uuid}`, data);
  }

  public updateRequestEmployeeStatus(
    uuid: string,
    { employeeUUID, ...payload }: IUpdateRequestEmployeeStatus
  ) {
    return this.patch(`/${uuid}/employees/${employeeUUID}/status`, payload);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const requestsProvider = new RequestsProvider();

export default requestsProvider;
