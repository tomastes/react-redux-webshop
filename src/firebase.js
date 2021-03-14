import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDtoyYH8VgpD7nU3FG0MMiwtt96h4kavPQ",
  authDomain: "fnoteabew-76c32.firebaseapp.com",
  databaseURL: "https://fnoteabew-76c32.firebaseio.com",
  projectId: "fnoteabew-76c32",
  storageBucket: "fnoteabew-76c32.appspot.com",
  messagingSenderId: "760636451030",
  appId: "1:760636451030:web:1a8dfa0eff70e915c04177",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
export default firebaseApp;
