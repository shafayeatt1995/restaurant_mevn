import BaseApi from "./base.api";
export class AuthApi extends BaseApi {
  constructor($axios) {
    super($axios);
    this.api.setBaseURL(`/api/auth/`);
  }

  signup(body) {
    return this.api.$post(`signup`, body);
  }
}
