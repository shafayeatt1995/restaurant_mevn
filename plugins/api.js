import {
  UserApi,
  AuthApi,
  AdminApi,
  ManagerApi,
  ItemApi,
  OrderApi,
  MowApi,
  CommonApi,
} from "@/api";
export default function ({ $axios, store }, inject) {
  const { apiUrl } = store.getters;

  inject("userApi", new UserApi($axios, apiUrl));
  inject("authApi", new AuthApi($axios, apiUrl));
  inject("adminApi", new AdminApi($axios, apiUrl));
  inject("managerApi", new ManagerApi($axios, apiUrl));
  inject("itemApi", new ItemApi($axios, apiUrl));
  inject("orderApi", new OrderApi($axios, apiUrl));
  inject("mowApi", new MowApi($axios, apiUrl));
  inject("commonApi", new CommonApi($axios, apiUrl));
}
