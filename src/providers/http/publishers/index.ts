import { IPublisher } from "@/interfaces/publisher.interface";
import { config } from "@/lib/config";
import Base from "@/providers/base";

class PublishersProvider extends Base {
    constructor() {
        super(`${config.apiURL}/publishers`)
    }

    public getAll(): Promise<IResponse<IPublisher[]>> {
        return this.get('/');
    }

    public getOne(uuid: string): Promise<IResponse<IPublisher>> {
        return this.get(`/${uuid}`);
    }
}

const publishersProvider = new PublishersProvider()

export default publishersProvider