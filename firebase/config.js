import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4rDsnwS6EppwXHr9p-Z93ZA2Gvfm1dBQ",
  authDomain: "my-first-app-6ade6.firebaseapp.com",
  databaseURL:
    "https://my-first-app-6ade6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-first-app-6ade6",
  storageBucket: "my-first-app-6ade6.appspot.com",
  messagingSenderId: "612371647571",
  appId: "1:612371647571:web:0d53e3d7c08592e4020aa6",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, storage, db };
