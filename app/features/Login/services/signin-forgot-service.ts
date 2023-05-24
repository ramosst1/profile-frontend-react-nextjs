import httpAdapter from "../../../util/httpAdapter";
import ISignInForgotRequest from "../interfaces/signin-forgot/signin-forgot-requests";
import ISignInForgotResponse from "../interfaces/signin-forgot/signin-forgot-response";

class SignInForgotService{

    private readonly ULR_BASE: string = '/Login/api/signinforgot/';

    public async signInForgotAsync(signupRequest: ISignInForgotRequest) {
      return await httpAdapter.post<ISignInForgotResponse>(this.ULR_BASE, signupRequest);
    }
}

export default new SignInForgotService();


