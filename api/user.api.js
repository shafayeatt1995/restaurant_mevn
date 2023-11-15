import BaseApi from "./base.api";
export class UserApi extends BaseApi {
  constructor($axios) {
    super($axios);
    // this.api.setBaseURL(`/api/user/`);
  }

  getPhotos() {
    return this.api.$get(`photos`);
  }
}
