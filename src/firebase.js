import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update, push } from "firebase/database"; 

const firebase = {
  apiKey: "AIzaSyBMfYU_PpdRtsmcefT6b-K6wemcTnJKx80",
  authDomain: "iot-inventory-16ac2.firebaseapp.com",
  databaseURL: "https://iot-inventory-16ac2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:"iot-inventory-16ac2",
   storageBucket: "iot-inventory-16ac2.firebasestorage.app",
  messagingSenderId: "935229468337",
  appId: "1:935229468337:web:8df8215d623f083540bc90",

};

const app = initializeApp(firebase);
const db = getDatabase(app);

export { db, ref, set, get, child, update, push };




