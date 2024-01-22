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

  fetchTax() {
    return this.api.$get(`tax`);
  }
}
