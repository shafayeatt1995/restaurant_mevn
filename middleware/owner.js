export default function ({ store, redirect }) {
  if (!store.getters.owner) {
    return redirect("/dashboard");
  }
}
