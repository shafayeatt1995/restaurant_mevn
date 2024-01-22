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

  fetchOrder(params) {
    return this.api.$get(`order`, { params });
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

  fetchBlockUser(params) {
    return this.api.$get(`block-user`, { params });
  }

  createBlockUser(body) {
    return this.api.$post(`block-user`, body);
  }

  updateBlockUser(body) {
    return this.api.$patch(`block-user`, body);
  }

  deleteBlockUser(params) {
    return this.api.$delete(`block-user`, { params });
  }

  fetchEmployee() {
    return this.api.$get(`employee`);
  }

  createEmployee(body) {
    return this.api.$post(`employee`, body);
  }

  updateEmployee(body) {
    return this.api.$patch(`employee`, body);
  }

  deleteEmployee(params) {
    return this.api.$delete(`employee`, { params });
  }

  fetchTax(params) {
    return this.api.$get(`tax`, { params });
  }

  createTax(body) {
    return this.api.$post(`tax`, body);
  }

  updateTax(body) {
    return this.api.$patch(`tax`, body);
  }

  deleteTax(params) {
    return this.api.$delete(`tax`, { params });
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
    return this.api.$post(`update-category-serial`, body);
  }

  UpdateSubCategorySerial(body) {
    return this.api.$post(`update-sub-category-serial`, body);
  }

  createSubCategory(body) {
    return this.api.$post(`sub-category`, body);
  }

  updateSubCategory(body) {
    return this.api.$patch(`sub-category`, body);
  }

  deleteSubCategory(params) {
    return this.api.$delete(`sub-category`, { params });
  }

  toggleStatus(id) {
    return this.api.$get(`item/toggle-status/${id}`);
  }

  UpdateItemSerial(body) {
    return this.api.$post(`item/update-serial`, body);
  }

  updateItemCategory(body) {
    return this.api.$post(`item/update-category`, body);
  }

  copyItem(body) {
    return this.api.$post(`item/copy`, body);
  }

  fetchDashboard(params) {
    return this.api.$get(`dashboard`, { params });
  }

  updatePrintingDetails(body) {
    return this.api.$post(`update-printing-details`, body);
  }
}
