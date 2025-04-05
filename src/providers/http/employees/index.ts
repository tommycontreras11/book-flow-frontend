import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICreateEmployee, IEmployee, IUpdateEmployee } from "./interface";

class EmployeesProvider extends Base {
  constructor() {
    super(`${config.apiURL}/employees`);
  }

  public getAll(): Promise<IResponse<IEmployee[]>> {
    return this.get("/");
  }

  public getOne(uuid: string): Promise<IResponse<IEmployee>> {
    return this.get(`/${uuid}`);
  }
  public create(data: ICreateEmployee) {
    return this.post("/", data);
  }

  public update(uuid: string, data: IUpdateEmployee) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const employeesProvider = new EmployeesProvider();

export default employeesProvider;
