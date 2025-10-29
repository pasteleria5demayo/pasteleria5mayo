import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-YCOF8KgpTPWt3wxBnKq_1wlxcn0V74A",
  authDomain: "pasteleria-5demayo.firebaseapp.com",
  projectId: "pasteleria-5demayo",
  storageBucket: "pasteleria-5demayo.firebasestorage.app",
  messagingSenderId: "833738955008",
  appId: "1:833738955008:web:edb4b05e8d7e9163fb3be5",
  measurementId: "G-0RVFDWHT28"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
