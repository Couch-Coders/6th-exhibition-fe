import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBCqK90YDvOYQquMKxeMX6AB4UJgX810wU",
    authDomain: "th-exhibition-be-d1404.firebaseapp.com",
    projectId: "th-exhibition-be-d1404",
    storageBucket: "th-exhibition-be-d1404.appspot.com",
    messagingSenderId: "987943665549",
    appId: "1:987943665549:web:1f31c6b112e9e81edc47c4",
    measurementId: "G-LNB600VT0N"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const signInGoogle = () =>{
    console.log('signInGoogle')
    const provider = new firebase.auth.GoogleAuthProvider()
    return auth.signInWithPopup(provider)
}
export const signOut = () =>{
    console.log('signOut')
    return auth.signOut()
}
