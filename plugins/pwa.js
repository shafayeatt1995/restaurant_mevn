if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Service Worker registration successful:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
