importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"),
  importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
  );

const firebaseConfig = {
  apiKey: "AIzaSyD3_5xbeNtWg1dAyCyCj-Fa1bQqPG1j8MI",
  authDomain: "restaurant-410614.firebaseapp.com",
  projectId: "restaurant-410614",
  storageBucket: "restaurant-410614.appspot.com",
  messagingSenderId: "364451328290",
  appId: "1:364451328290:web:ab632cf5f4691d3a70f57b",
  measurementId: "G-HJFDKGNF1L",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("message receive", payload);
});
