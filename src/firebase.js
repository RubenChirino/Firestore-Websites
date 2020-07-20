 import firebase from "firebase/app";
 import "firebase/firestore";

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCWTeeSSxKeTaGYS1jQ4XtcaJtEbx3cCy8",
    authDomain: "websites-crud.firebaseapp.com",
    databaseURL: "https://websites-crud.firebaseio.com",
    projectId: "websites-crud",
    storageBucket: "websites-crud.appspot.com",
    messagingSenderId: "121185622103",
    appId: "1:121185622103:web:2fddcf421688086b21eb12"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();
