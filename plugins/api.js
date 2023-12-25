import { UserApi, AuthApi, AdminApi, ManagerApi, ItemApi } from "@/api";
export default function ({ $axios }, inject) {
  inject("userApi", new UserApi($axios));
  inject("authApi", new AuthApi($axios));
  inject("adminApi", new AdminApi($axios));
  inject("managerApi", new ManagerApi($axios));
  inject("itemApi", new ItemApi($axios));
}
