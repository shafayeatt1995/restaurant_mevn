import { getItem } from "~/utils";

class BaseApi {
  constructor($axios) {
    const config = { withCredentials: false, headers: {} };
    const token = getItem("auth._token.cookie");
    if (token) config.headers.Authorization = token;

    this.api = $axios.create(config);
  }
}

export default BaseApi;
