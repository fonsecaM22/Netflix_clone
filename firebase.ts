// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc3yDE-ZBbXSuBOTu9GXXnsQis8So6Dak",
  authDomain: "netflix-clone-3b5ee.firebaseapp.com",
  projectId: "netflix-clone-3b5ee",
  storageBucket: "netflix-clone-3b5ee.firebasestorage.app",
  messagingSenderId: "171863475293",
  appId: "1:171863475293:web:a8ea9e701b8907ef29f9b4",
  measurementId: "G-HV94SB646Z"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }