import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useContactStore = defineStore('contactStore', () => {
  const questionForm = ref(true)

  const switchToQuestionForm = () => {
    questionForm.value = true
  }
  const switchToQuoteForm = () => {
    questionForm.value = false
  }

  return { questionForm, switchToQuestionForm, switchToQuoteForm }
})
