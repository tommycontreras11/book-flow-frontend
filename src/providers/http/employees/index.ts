import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IEmployee } from "./interface";

class EmployeesProvider extends Base {
    constructor() {
        super(`${config.apiURL}/employees`)
    }

    public getAll(): Promise<IResponse<IEmployee[]>> {
        return this.get('/')
    }

    public getOne(uuid: string): Promise<IResponse<IEmployee>> {
        return this.get(`/${uuid}`)
    }
}

const employeesProvider = new EmployeesProvider()

export default employeesProvider