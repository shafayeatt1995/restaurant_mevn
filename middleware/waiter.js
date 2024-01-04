export default function ({ store, redirect }) {
  if (!store.getters.waiter) {
    return redirect("/dashboard");
  }
}
