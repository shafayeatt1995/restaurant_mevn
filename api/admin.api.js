import BaseApi from "./base.api";
export class AdminApi extends BaseApi {
  constructor($axios) {
    super($axios);
    this.api.setBaseURL(`/api/admin/`);
  }

  createCategory(body) {
    return this.api.$post(`create-category`, body);
  }
}
