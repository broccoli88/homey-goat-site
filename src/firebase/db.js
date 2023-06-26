import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey,
  authDomain: 'homey-goat.firebaseapp.com',
  databaseURL: 'https://homey-goat-default-rtdb.firebaseio.com',
  projectId: 'homey-goat',
  storageBucket: 'homey-goat.appspot.com',
  messagingSenderId: '43737944137',
  appId: '1:43737944137:web:88177f6360740f8c94af98'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore()
const storage = getStorage(app)
const auth = getAuth()
const storageRef = ref(storage)

export { db, storageRef, auth }
