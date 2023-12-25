export default function ({ store, redirect }) {
  if (!store.getters.manager) {
    return redirect("/dashboard");
  }
}
