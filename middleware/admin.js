export default function ({ store, redirect }) {
  if (!store.getters.admin) {
    return redirect("/dashboard");
  }
}
