export default function ({ store, redirect }) {
  if (!store.getters.manager && !store.getters.user) {
    return redirect("/dashboard");
  }
}
