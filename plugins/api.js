import { UserApi, AuthApi, AdminApi } from "@/api";
export default function ({ $axios }, inject) {
  inject("userApi", new UserApi($axios));
  inject("authApi", new AuthApi($axios));
  inject("adminApi", new AdminApi($axios));
}
