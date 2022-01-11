import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB4jvOp2dczh3K4NGHGoyqzwokHKvxxiTk",
    authDomain: "mymoney-1e7e8.firebaseapp.com",
    projectId: "mymoney-1e7e8",
    storageBucket: "mymoney-1e7e8.appspot.com",
    messagingSenderId: "579711025992",
    appId: "1:579711025992:web:ad005fd2bfade0dc16697d"
};

// Init firebase
firebase.initializeApp(firebaseConfig)

// Init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// Timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }