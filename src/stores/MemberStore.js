import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import team from '../data/team.json'

export const useMemberStore = defineStore('memberStore', () => {
  const members = ref(team.team)
  const member = ref({})

  const showModal = ref(false)

  const toggleModal = () => {
    showModal.value = !showModal.value
  }

  const body = document.body

  watch(showModal, () => {
    showModal.value ? (body.style.overflow = 'hidden') : (body.style.overflow = 'initial')
  })

  return { member, members, showModal, toggleModal }
})
