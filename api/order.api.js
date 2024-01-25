import BaseApi from "./base.api";
export class OrderApi extends BaseApi {
  constructor($axios) {
    super($axios);
    this.api.setBaseURL(`/api/order/`);
  }

  createOrder(body) {
    return this.api.$post(`/`, body);
  }

  print(body) {
    return this.api.$post(`/print`, body);
  }
}
