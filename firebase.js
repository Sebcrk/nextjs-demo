// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYYALWTLnLXPo5slcGcbQfMqjNsQUiovE",
  authDomain: "react-http-98ef4.firebaseapp.com",
  databaseURL: "https://react-http-98ef4-default-rtdb.firebaseio.com",
  projectId: "react-http-98ef4",
  storageBucket: "react-http-98ef4.appspot.com",
  messagingSenderId: "589695824787",
  appId: "1:589695824787:web:e2f841136f07d18815ae66"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)