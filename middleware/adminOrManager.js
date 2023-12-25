export default function ({ store, redirect }) {
  if (!store.getters.admin || !store.getters.manager) {
    return redirect("/dashboard");
  }
}
