import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAdminGalleryStore = defineStore('adminGalleryStore', () => {
  //   ...::: [ MODAL ] :::...

  const showModal = ref(false)
  const currentChange = ref('')

  function closeModal() {
    showModal.value = false
  }
  //   ...::: [ ADMIN PANEL ] :::...

  const isInAdminPanel = ref(false)

  return { isInAdminPanel, showModal, currentChange, closeModal }
})
