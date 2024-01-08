import BaseApi from "./base.api";
export class MowApi extends BaseApi {
  constructor($axios) {
    super($axios);
    this.api.setBaseURL(`/api/mow/`);
  }

  fetchOrder(params) {
    return this.api.$get(`order`, { params });
  }

  updateOrderStatus(body) {
    return this.api.$post(`order/update-status`, body);
  }
}
