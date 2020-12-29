import firebase from 'firebase/app'
import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyCdLk-I50ax1XzET71b4d8rYSP9XnNXFr4",
    authDomain: "todo-ninja-38cbc.firebaseapp.com",
    databaseURL: "https://todo-ninja-38cbc-default-rtdb.firebaseio.com",
    projectId: "todo-ninja-38cbc",
    storageBucket: "todo-ninja-38cbc.appspot.com",
    messagingSenderId: "339261254117",
    appId: "1:339261254117:web:068c6da1d7d28420c5670c",
    measurementId: "G-VSM5XG86E1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  db.settings({ timestampsInSnapshots: true});

  export default db;
