import httpAdapter from "../../../util/httpAdapter";
import { ISignInRequest } from "../interfaces/signin/signin-requests";
import { ISignInResponse } from "../interfaces/signin/signin-responses";

class SignInServicex{

    private readonly ULR_BASE: string = '/features/Login/api/signin/';

    public async SignInAsync(signupRequest: ISignInRequest) {
      return await httpAdapter.post<ISignInResponse>(this.ULR_BASE, signupRequest);
    }
}

export default new SignInServicex();


