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

  deleteItem(params) {
    return this.api.$delete(`item`, { params });
  }

  fetchTable(params) {
    return this.api.$get(`table`, { params });
  }

  createTable(body) {
    return this.api.$post(`table`, body);
  }

  updateTable(body) {
    return this.api.$patch(`table`, body);
  }

  deleteTable(params) {
    return this.api.$delete(`table`, { params });
  }

  updateRestaurantName(body) {
    return this.api.$post(`update-restaurant-name`, body);
  }
}
