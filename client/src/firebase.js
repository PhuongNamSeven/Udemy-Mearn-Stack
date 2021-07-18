import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdZ8aTpyR-k1f2O7EsW3F6ahxdVqI8FK4",
  authDomain: "ecommerce-b2e24.firebaseapp.com",
  databaseURL: "https://ecommerce-b2e24.firebaseio.com",
  projectId: "ecommerce-b2e24",
  storageBucket: "ecommerce-b2e24.appspot.com",
  messagingSenderId: "2722663737",
  appId: "1:2722663737:web:acbfd1be3c39438ce66ce8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
