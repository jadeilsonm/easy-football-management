import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const mode = import.meta.env.MODE;
console.log('mode:', mode);

export const firebaseConfig = {
  apiKey: "AIzaSyB6DT1ueMDOPNFJAt3aHKvX_XAnjM2Qdag",
  authDomain: "easy-football-management-7ecf6.firebaseapp.com",
  projectId: "easy-football-management-7ecf6",
  storageBucket: "easy-football-management-7ecf6.firebasestorage.app",
  messagingSenderId: "343876823632",
  appId: "1:343876823632:web:0dfbfbee50138b6c733f55",
  measurementId: "G-2F6QVC69S0"
};

export const firebaseApp = initializeApp(firebaseConfig);


const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

if ( mode === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");

}

