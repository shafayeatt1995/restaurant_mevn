import BaseApi from "./base.api";
export class UserApi extends BaseApi {
  constructor($axios) {
    super($axios);
    this.api.setBaseURL(`/api/user/`);
  }

  fetchImage(params) {
    return this.api.$get(`image`, { params });
  }

  addImage(body) {
    return this.api.$post(`image`, body);
  }

  deleteImage(params) {
    return this.api.$delete(`image`, { params });
  }
}
