import BaseApi from "./base.api";
export class ItemApi extends BaseApi {
  constructor($axios, apiUrl) {
    super($axios);
    this.api.setBaseURL(`${apiUrl}/api/item/`);
  }

  fetchCategory(params) {
    return this.api.$get(`category`, { params });
  }
}
