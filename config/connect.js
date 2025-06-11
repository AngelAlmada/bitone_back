// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBodwz-dDBcOxWs7enDxBRKwJKrm3mP198",
  authDomain: "deliverybitone.firebaseapp.com",
  projectId: "deliverybitone",
  storageBucket: "deliverybitone.firebasestorage.app",
  messagingSenderId: "768340790570",
  appId: "1:768340790570:web:554e9e1ee2ae5beb2d2253",
  measurementId: "G-CNCFT55HM6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);