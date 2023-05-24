import { IStatesResponse } from "../../interfaces/states/states-responses";
import httpAdapter  from "../../util/httpAdapter";

class StatesServices {

    public async getStatesAsync() {
        return await httpAdapter.get<IStatesResponse>('/api/states/');
     }
 
}

export default new StatesServices();