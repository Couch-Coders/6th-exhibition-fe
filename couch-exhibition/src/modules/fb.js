import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBdCaG4km8EpCNadinLm1g7llr5wX1izoo",
    authDomain: "couchcoding-47515.firebaseapp.com",
    projectId: "couchcoding-47515",
    storageBucket: "couchcoding-47515.appspot.com",
    messagingSenderId: "213206292936",
    appId: "1:213206292936:web:578656afd2913e69e2c8fd",
    measurementId: "G-PGVX1M2R5T"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const signInGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider()
    return auth.signInWithPopul(provider)
}
export const signOut = () =>{
    return auth.signOut()
}
