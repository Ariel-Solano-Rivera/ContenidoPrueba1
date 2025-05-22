// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEJ7P1mKQ_6kgsfdCk3d3O-u53GJShFpc",
  authDomain: "pruebaprueba-d121a.firebaseapp.com",
  projectId: "pruebaprueba-d121a",
  storageBucket: "pruebaprueba-d121a.firebasestorage.app",
  messagingSenderId: "350661094817",
  appId: "1:350661094817:web:993d2fc8a04228a792afe0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };