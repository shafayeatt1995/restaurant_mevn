import BaseApi from "./base.api";
export class ManagerApi extends BaseApi {
  constructor($axios) {
    super($axios);
    this.api.setBaseURL(`/api/manager/`);
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

  fetchCategory() {
    return this.api.$get(`category`);
  }

  createCategory(body) {
    return this.api.$post(`category`, body);
  }

  updateCategory(body) {
    return this.api.$patch(`category`, body);
  }

  deleteCategory(params) {
    return this.api.$delete(`category`, { params });
  }

  UpdateCategorySerial(body) {
    return this.api.$post(`category-serial`, body);
  }
}
