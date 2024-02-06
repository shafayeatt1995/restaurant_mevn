import BaseApi from "./base.api";
export class UserApi extends BaseApi {
  constructor($axios) {
    super($axios);
    this.api.setBaseURL(`/api/user/`);
  }

  fetchImage(params) {
    return this.api.$get(`image`, { params });
  }

  deleteImage(params) {
    return this.api.$delete(`image`, { params });
  }

  cancelOrder(params) {
    return this.api.$delete(`order/cancel`, { params });
  }

  completeOrder(params) {
    return this.api.$get(`order/complete`, { params });
  }

  getOrder(params) {
    return this.api.$get(`order`, { params });
  }

  billRequest(params) {
    return this.api.$get(`bill-request`, { params });
  }

  updateProfile(params) {
    return this.api.$get(`update-profile`, { params });
  }
}
