import { defineStore } from 'pinia'
import { db } from '../firebase/db'
import { doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore'
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

  // --- DELETE operations ---

  //   Delete system

  const deleteInfo = ref({
    system: {
      title: '',
      toDelete: false
    },
    fraction: {
      title: '',
      toDelete: false
    }
  })

  async function deleteSystem(systemName) {
    deleteInfo.value.system.title = systemName
    deleteInfo.value.system.toDelete = true
    deleteInfo.value.fraction.title = ''
    deleteInfo.value.fraction.toDelete = false

    const systemRef = doc(db, 'systems', deleteInfo.value.system.title)

    if (deleteInfo.value.system.toDelete && !deleteInfo.value.fraction.toDelete) {
      await deleteDoc(systemRef)
    } else {
      return
    }
  }

  async function deleteFraction(systemName, fractionName) {
    deleteInfo.value.system.title = systemName
    deleteInfo.value.system.toDelete = true
    deleteInfo.value.fraction.title = fractionName
    deleteInfo.value.fraction.toDelete = true

    const docRef = doc(db, 'systems', systemName)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      const fractionsData = data.fractions
      const index = fractionsData.findIndex((fraction) => fraction.fraction === fractionName)

      if (index !== -1) {
        fractionsData.splice(index, 1)
        console.log(fractionsData)
        await updateDoc(docRef, { fractions: fractionsData })
      }
    } else {
      console.log('Document does not exist')
    }
  }

  return {
    // Modal
    isInAdminPanel,
    showModal,
    currentChange,
    closeModal,
    // Delete
    deleteInfo,
    deleteSystem,
    deleteFraction
  }
})
