import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

// object that is used to connect firebase to the backend
const firebaseConfig = {
  apiKey: "AIzaSyD6TqMimv4l3tkmI42Uwrk5AWV7K5iWsMA",
  authDomain: "mypromanagement-3617d.firebaseapp.com",
  projectId: "mypromanagement-3617d",
  storageBucket: "mypromanagement-3617d.appspot.com",
  messagingSenderId: "53377633137",
  appId: "1:53377633137:web:49094040fa8b587b3144d0"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp }