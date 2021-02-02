import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCqO9iL8_vowT-JFLKtD1h3u-f9ZftKAdI",
  authDomain: "blogapp-23328.firebaseapp.com",
  projectId: "blogapp-23328",
  storageBucket: "blogapp-23328.appspot.com",
  messagingSenderId: "172588345494",
  appId: "1:172588345494:web:ac56e28f7002a860d47ab7",
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
const fire = firebase;
export default fire;
