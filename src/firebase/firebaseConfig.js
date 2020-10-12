import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDJEB3dQ1Nuua7yIARyTT4MQnWw0nBT3zg",
    authDomain: "react-app-curso-9ff91.firebaseapp.com",
    databaseURL: "https://react-app-curso-9ff91.firebaseio.com",
    projectId: "react-app-curso-9ff91",
    storageBucket: "react-app-curso-9ff91.appspot.com",
    messagingSenderId: "25669576960",
    appId: "1:25669576960:web:72531646aed1a072962be5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
};
