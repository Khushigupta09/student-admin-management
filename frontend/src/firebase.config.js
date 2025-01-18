import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1l5InSEYjXlhKrwKc-_gTALVrdsVqBaw",
  authDomain: "admin-project-86ebd.firebaseapp.com",
  projectId: "admin-project-86ebd",
  storageBucket: "admin-project-86ebd.firebasestorage.app",
  messagingSenderId: "740641289983",
  appId: "1:740641289983:web:5744a8c3f3edebb3807eca",
  measurementId: "G-58QB81WVHE"
};

firebase.initializeApp(firebaseConfig)

export default firebase