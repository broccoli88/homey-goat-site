import { defineStore } from 'pinia'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators'
import { reactive, ref } from 'vue'
import db from '../firebase/db'
import { collection, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore'

export const useAdminStore = defineStore('adminStore', () => {
  // Disabling NavBar and Footer

  const isMobileView = ref(false)

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      isMobileView.value = false
    } else {
      isMobileView.value = true
    }
  })

  window.addEventListener('load', () => {
    if (window.innerWidth >= 768) {
      isMobileView.value = false
    } else {
      isMobileView.value = true
    }
  })

  // ...::: [LOGIN VALIDATION ] :::...

  const adminState = reactive({
    username: '',
    password: {
      password: '',
      confirmPassword: ''
    }
  })

  const rules = {
    username: {
      required: helpers.withMessage('State your username human!', required),
      minLength: minLength(3),
      maxLength: maxLength(20),
      $autoDirty: true
    },
    password: {
      password: {
        required: helpers.withMessage('Enter password...', required),
        minLength: minLength(3),
        maxLength: maxLength(20),
        $autoDirty: true
      },
      confirmPassword: {
        required: helpers.withMessage('Repeat password...', required),
        sameAs: helpers.withMessage(
          'Input must be the same as password',
          sameAs(() => adminState.password.password)
        ),
        $autoDirty: true
      }
    }
  }

  const v = useVuelidate(rules, adminState)

  async function handleLogIn() {
    const isLoginCorrect = v.value.$validate()

    if (!isLoginCorrect) return
  }

  // ...::: [ ADMIN PANEL - MESSAGES]] :::...

  let messages = ref([])

  async function getMessages() {
    const m = query(collection(db, 'messages'))
    onSnapshot(m, (snap) => {
      messages.value = []
      snap.forEach((doc) => {
        messages.value.push({ ...doc.data(), id: doc.id })
      })
    })
  }

  async function deleteMessage(id) {
    const docRef = doc(db, 'messages', id)
    await deleteDoc(docRef)
  }

  return { isMobileView, v, adminState, messages, handleLogIn, getMessages, deleteMessage }
})
