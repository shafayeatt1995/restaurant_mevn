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

  fetchAllEmployee() {
    return this.api.$get(`employee-all`);
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

  fetchVat(params) {
    return this.api.$get(`vat`, { params });
  }

  createVat(body) {
    return this.api.$post(`vat`, body);
  }

  updateVat(body) {
    return this.api.$patch(`vat`, body);
  }

  deleteVat(params) {
    return this.api.$delete(`vat`, { params });
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

  updatePrintingDetails(body) {
    return this.api.$post(`update-printing-details`, body);
  }

  addServiceCharge(body) {
    return this.api.$post(`add-service-charge`, body);
  }

  fetchPrintOrder(id) {
    return this.api.$get(`order/print-details/${id}`);
  }

  fetchPerformance(body) {
    return this.api.$post(`performance`, body);
  }

  toggleProtection() {
    return this.api.$get(`toggle-protection`);
  }

  fetchNotification(params) {
    return this.api.$get(`notification`, { params });
  }

  fetchNewNotification() {
    return this.api.$get(`notification/new`);
  }

  toggleNotification(params) {
    return this.api.$get(`notification/toggle`, { params });
  }

  markAllNotification() {
    return this.api.$get(`notification/mark`);
  }

  createFeatureCategory(body) {
    return this.api.$post(`feature-category`, body);
  }

  updateFeatureCategory(body) {
    return this.api.$patch(`feature-category`, body);
  }

  fetchSingleOrder(id) {
    return this.api.$get(`single-order/${id}`);
  }

  fetchBestItems(body) {
    return this.api.$post(`best-items`, body);
  }

  chartSalesReport(body) {
    return this.api.$post(`chart-sales-report`, body);
  }

  chartOrderReport(body) {
    return this.api.$post(`chart-order-report`, body);
  }

  fetchWaiterSales(body) {
    return this.api.$post(`waiter-sales`, body);
  }

  fetchWaiterOrders(body) {
    return this.api.$post(`waiter-orders`, body);
  }
}
