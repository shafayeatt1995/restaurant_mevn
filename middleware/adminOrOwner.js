export default function ({ store, redirect }) {
  if (!store.getters.admin || !store.getters.owner) {
    return redirect("/dashboard");
  }
}
