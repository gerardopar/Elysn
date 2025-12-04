// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmqRYVR_ui37ql_nehjyjAxwdyn9fMiNE",
  authDomain: "elysn-46dd2.firebaseapp.com",
  projectId: "elysn-46dd2",
  storageBucket: "elysn-46dd2.firebasestorage.app",
  messagingSenderId: "445713379704",
  appId: "1:445713379704:web:6c5bfccdb7b9844b26988d",
  measurementId: "G-C1P0YZVMCT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export default app;
