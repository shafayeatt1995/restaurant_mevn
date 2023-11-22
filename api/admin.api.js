import BaseApi from "./base.api";
export class AdminApi extends BaseApi {
  constructor($axios) {
    super($axios);
    this.api.setBaseURL(`/api/admin/`);
  }

  fetchUser(params) {
    return this.api.$get(`user`, { params });
  }

  createUser(body) {
    return this.api.$post(`user`, body);
  }

  updateUser(body) {
    return this.api.$patch(`user`, body);
  }

  deleteUser(params) {
    return this.api.$delete(`user`, { params });
  }

  suspendUser(params) {
    return this.api.$put(`user`, params);
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
