import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAdminGalleryStore = defineStore('adminGalleryStore', () => {
  const isInAdminPanel = ref(false)

  return { isInAdminPanel }
})
