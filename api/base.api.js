class BaseApi {
  constructor($axios) {
    this.api = $axios.create();
  }

  setBaseURL(baseURL) {
    this.api.setBaseURL(baseURL);
  }

  findAll(params) {
    return this.api.$get(``, {
      params,
    });
  }

  findAllAsPost(body) {
    return this.api.$post(`all`, body);
  }

  findById(id) {
    return this.api.$get(`/${id}`);
  }

  findByIdAsPost(id, body) {
    return this.api.$post(`/${id}`, body);
  }

  create(item) {
    return this.api.$post(``, item);
  }

  update(id, item) {
    return this.api.$patch(`/${id}`, item);
  }

  delete(id) {
    return this.api.$delete(`/${id}`);
  }
}

export default BaseApi;
