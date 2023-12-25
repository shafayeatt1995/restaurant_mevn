import BaseApi from "./base.api";
export class ItemApi extends BaseApi {
  constructor($axios) {
    super($axios);
    this.api.setBaseURL(`/api/item/`);
  }

  fetchCategory(params) {
    return this.api.$get(`category`, { params });
  }
}
