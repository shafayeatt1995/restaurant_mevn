import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD3_5xbeNtWg1dAyCyCj-Fa1bQqPG1j8MI",
  authDomain: "restaurant-410614.firebaseapp.com",
  projectId: "restaurant-410614",
  storageBucket: "restaurant-410614.appspot.com",
  messagingSenderId: "364451328290",
  appId: "1:364451328290:web:ab632cf5f4691d3a70f57b",
  measurementId: "G-HJFDKGNF1L",
};

export const app = initializeApp(firebaseConfig);
// export const messaging = getMessaging(app);
export const messaging = (async () => {
  try {
    console.log("firebase is supported", await isSupported());
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      console.log("firebase is supported");

      console.log("Firebase not supported this browser");
      return getMessaging(config);
    }
    console.log("Firebase not supported this browser");
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
})();
