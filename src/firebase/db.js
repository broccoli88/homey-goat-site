import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'homeygoat-3ed36.firebaseapp.com',
  projectId: 'homeygoat-3ed36',
  storageBucket: 'homeygoat-3ed36.appspot.com',
  messagingSenderId: '227243833651',
  appId: '1:227243833651:web:238adf28008f3ef78e2646'
}
const app = initializeApp(firebaseConfig)
const db = getFirestore()
const storage = getStorage(app)
const auth = getAuth()
const storageRef = ref(storage)

export { db, storageRef, auth }
