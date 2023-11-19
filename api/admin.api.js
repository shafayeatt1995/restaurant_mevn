import BaseApi from "./base.api";
export class AdminApi extends BaseApi {
  constructor($axios) {
    super($axios);
    this.api.setBaseURL(`/api/admin/`);
  }

  fetchCategory(params) {
    return this.api.$get(`category`, { params });
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
}
