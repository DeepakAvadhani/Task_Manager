import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtifMKdrdutpJuioqoAarBc3IGfVL2XUo",
  authDomain: "task-manager-admin-6ebae.firebaseapp.com",
  projectId: "task-manager-admin-6ebae",
  storageBucket: "task-manager-admin-6ebae.appspot.com",
  messagingSenderId: "1084628512088",
  appId: "1:1084628512088:web:cfd6129e3f855c7c11092d",
  measurementId: "G-2L5X0TY5TQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app)