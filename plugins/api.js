import { UserApi, AuthApi, AdminApi, OwnerApi } from "@/api";
export default function ({ $axios }, inject) {
  inject("userApi", new UserApi($axios));
  inject("authApi", new AuthApi($axios));
  inject("adminApi", new AdminApi($axios));
  inject("ownerApi", new OwnerApi($axios));
}
