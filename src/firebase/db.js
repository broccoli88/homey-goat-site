import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyADC8E1V62_L-UDvD6j0W_kq5VyuR2aPkI',
  authDomain: 'homey-goat.firebaseapp.com',
  databaseURL: 'https://homey-goat-default-rtdb.firebaseio.com',
  projectId: 'homey-goat',
  storageBucket: 'homey-goat.appspot.com',
  messagingSenderId: '43737944137',
  appId: '1:43737944137:web:88177f6360740f8c94af98'
}

initializeApp(firebaseConfig)

const db = getFirestore()

export default db
