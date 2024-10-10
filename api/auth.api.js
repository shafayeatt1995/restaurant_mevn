import BaseApi from "./base.api";
export class AuthApi extends BaseApi {
  constructor($axios, apiUrl) {
    super($axios);
    this.api.setBaseURL(`${apiUrl}/api/auth/`);
  }

  signup(body) {
    return this.api.$post(`signup`, body);
  }

  socialLogin(provider) {
    return this.api.$get(`social-login/${provider}`);
  }
}
