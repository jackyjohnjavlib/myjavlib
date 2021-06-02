import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBDGpTsLoBD2WmO0whICPSulDZ011EsvWo",
  authDomain: "nextjavlib.firebaseapp.com",
  projectId: "nextjavlib",
  storageBucket: "nextjavlib.appspot.com",
  messagingSenderId: "1064805582492",
  appId: "1:1064805582492:web:74854b50d3a70714f10f59",
  measurementId: "G-MSR6VC4GG3",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
