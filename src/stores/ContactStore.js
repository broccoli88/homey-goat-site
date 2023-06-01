import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'

export const useContactStore = defineStore('contactStore', () => {
  const questionForm = ref(true)

  // Form Card switch

  const switchToQuestionForm = () => {
    questionForm.value = true
  }
  const switchToQuoteForm = () => {
    questionForm.value = false
  }

  //   < < < Forms > > >

  //   Validation Rules
  const rules = {
    firstName: { required, minLength: minLength(3), maxLength: maxLength(15), $autoDirty: true },
    lastName: { required, minLength: minLength(3), maxLength: maxLength(15), $autoDirty: true },
    email: {
      required: helpers.withMessage('Enter email', required),
      email,
      maxLength: maxLength(40),
      $autoDirty: true
    },
    subject: { required: helpers.withMessage('Enter what this message is about...', required) },
    country: { required, minLength: minLength(3), maxLength: maxLength(15), $autoDirty: true },
    modelSupply: { required: helpers.withMessage('Select an option', required) },
    service: { required: helpers.withMessage('At least one option must be selected', required) },
    message: { required, minLength: minLength(3), maxLength: maxLength(1000), $autoDirty: true }
  }

  //   Question Form

  const questionState = reactive({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })

  const v1 = useVuelidate(rules, questionState)

  const handleQuestionForm = async () => {
    const isFormCorrect = await v1.value.$validate()

    if (!isFormCorrect) return
  }

  //   Quote Form

  const quoteState = reactive({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    modelSupply: '',
    service: [],
    message: ''
  })

  const v2 = useVuelidate(rules, quoteState)

  const handleQuoteForm = async () => {
    const isFormCorrect = await v2.value.$validate()

    if (!isFormCorrect) return
  }

  return {
    questionForm,
    questionState,
    quoteState,
    v1,
    v2,
    switchToQuestionForm,
    switchToQuoteForm,
    handleQuestionForm,
    handleQuoteForm
  }
})
