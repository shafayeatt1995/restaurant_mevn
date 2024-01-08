export default function ({ store, redirect }) {
  if (!store.getters.manager && !store.getters.waiter) {
    return redirect("/dashboard");
  }
}
