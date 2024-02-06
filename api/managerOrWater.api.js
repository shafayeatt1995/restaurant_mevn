import BaseApi from "./base.api";
export class MowApi extends BaseApi {
  constructor($axios) {
    super($axios);
    this.api.setBaseURL(`/api/mow/`);
  }

  fetchTable() {
    return this.api.$get(`table`);
  }

  fetchTableOrder() {
    return this.api.$get(`order-table`);
  }

  fetchOrder(params) {
    return this.api.$get(`order`, { params });
  }

  updateOrderStatus(params) {
    return this.api.$get(`order/update-status`, { params });
  }

  fetchVat() {
    return this.api.$get(`vat`);
  }

  fetchDashboard(params) {
    return this.api.$get(`dashboard`, { params });
  }

  printOrderDetails(params) {
    return this.api.$get(`print-order-details`, { params });
  }

  fetchOrderDetails(params) {
    return this.api.$get(`order/details`, { params });
  }

  chartSalesData(params) {
    return this.api.$get(`chart-sales-data`, { params });
  }

  recentOrder() {
    return this.api.$get(`recent-order`);
  }

  sendCancelRequest(params) {
    return this.api.$get(`cancel-request`, { params });
  }
}
