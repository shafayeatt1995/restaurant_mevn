import BaseApi from "./base.api";
export class CommonApi extends BaseApi {
  constructor($axios) {
    super($axios);
    this.api.setBaseURL(`/api/`);
  }

  testNotification() {
    return this.api.$get(`push-notification/sent`);
  }
}