export default function ({ store, redirect }) {
  if (!store.getters.admin || !store.getters.waiter) {
    return redirect("/dashboard");
  }
}
