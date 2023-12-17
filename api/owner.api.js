import BaseApi from "./base.api";
export class OwnerApi extends BaseApi {
  constructor($axios) {
    super($axios);
    this.api.setBaseURL(`/api/owner/`);
  }

  getCategory() {
    return this.api.$get(`category`);
  }

  fetchItems(params) {
    return this.api.$get(`item`, { params });
  }

  getItem(id) {
    return this.api.$get(`item/${id}`);
  }

  createItem(body) {
    return this.api.$post(`item`, body);
  }

  updateItem(body) {
    return this.api.$patch(`item`, body);
  }
}
