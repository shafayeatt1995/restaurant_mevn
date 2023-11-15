class BaseApi {
  constructor($axios) {
    this.api = $axios.create();
  }

  setBaseURL(baseURL) {
    this.api.setBaseURL(baseURL);
  }
}

export default BaseApi;
