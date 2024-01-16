const base64Convert = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const saveSubscription = async (subscription) => {
  const response = await fetch(
    // "http://localhost:8080/api/push-notification/update",
    "https://scaneating.com/api/push-notification/update",
    {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(subscription),
    }
  );
  return response.json();
};

self.addEventListener("activate", async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: base64Convert(
      "BEjfeQ9ym633deePHh93i9o0OZyV8h9bvvLZfy21vR2AJOvpm26gqNaRk23wv7JiewVWh6yTqz7AK4zQ6kb6Y34"
    ),
  });
  if (subscription) {
    await saveSubscription(subscription);
  }
});

self.addEventListener("push", (e) => {
  self.registration.showNotification("Wohoo!!", { body: e.data.text() });
});
