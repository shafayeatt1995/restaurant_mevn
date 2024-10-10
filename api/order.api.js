import BaseApi from "./base.api";
export class OrderApi extends BaseApi {
  constructor($axios, apiUrl) {
    super($axios);
    this.api.setBaseURL(`${apiUrl}/api/order/`);
  }

  createOrder(body) {
    return this.api.$post(`/`, body);
  }

  print(body) {
    return this.api.$post(`/print`, body);
  }
}
