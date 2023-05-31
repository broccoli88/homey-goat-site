import { defineStore } from 'pinia'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators'
import { reactive } from 'vue'

export const useAdminStore = defineStore('adminStore', () => {
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

  return { v, adminState, handleLogIn }
})
