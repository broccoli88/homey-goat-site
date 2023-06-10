import { defineStore } from 'pinia'
import { db } from '../firebase/db'
import { doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { useAdminStore } from './AdminStore'

export const useAdminGalleryStore = defineStore('adminGalleryStore', () => {
  const adminStore = useAdminStore()

  //   ...::: [ MODAL ] :::...

  const showModal = ref(false)
  const currentChange = ref('')

  function closeModal() {
    showModal.value = false
  }
  //   ...::: [ ADMIN PANEL ] :::...

  const isInAdminPanel = ref(false)

  // --- DELETE operations ---

  const deleteInfo = ref({
    system: {
      title: '',
      toDelete: false
    },
    fraction: {
      title: '',
      toDelete: false
    },
    model: {
      title: '',
      toDelete: false
    }
  })
  //   Delete system

  async function deleteSystem(systemName) {
    deleteInfo.value.system.title = systemName
    deleteInfo.value.system.toDelete = true
    deleteInfo.value.fraction.title = ''
    deleteInfo.value.fraction.toDelete = false
    deleteInfo.value.model.title = ''
    deleteInfo.value.model.toDelete = false

    const systemRef = doc(db, 'systems', deleteInfo.value.system.title)

    if (
      deleteInfo.value.system.toDelete &&
      !deleteInfo.value.fraction.toDelete &&
      !deleteInfo.value.model.toDelete
    ) {
      await deleteDoc(systemRef)
    } else {
      return
    }
  }

  //   Delete fraction

  async function deleteFraction(systemName, fractionName) {
    deleteInfo.value.system.title = systemName
    deleteInfo.value.system.toDelete = true
    deleteInfo.value.fraction.title = fractionName
    deleteInfo.value.fraction.toDelete = true
    deleteInfo.value.model.title = ''
    deleteInfo.value.model.toDelete = false

    if (
      deleteInfo.value.system.toDelete &&
      deleteInfo.value.fraction.toDelete &&
      !deleteInfo.value.model.toDelete
    ) {
      const docRef = doc(db, 'systems', systemName)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        const fractionsData = data.fractions
        const index = fractionsData.findIndex((fraction) => fraction.fraction === fractionName)

        if (index !== -1) {
          fractionsData.splice(index, 1)
          await updateDoc(docRef, { fractions: fractionsData })
        }
      } else {
        console.log('Document does not exist')
      }
    } else {
      return
    }
  }

  //   Delete model

  async function deleteModel(systemName, fractionName, modelName) {
    deleteInfo.value.system.title = systemName
    deleteInfo.value.system.toDelete = true
    deleteInfo.value.fraction.title = fractionName
    deleteInfo.value.fraction.toDelete = true
    deleteInfo.value.model.title = modelName
    deleteInfo.value.model.toDelete = true

    try {
      const docRef = doc(db, 'systems', systemName)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        const fractionsData = [...data.fractions]
        const fractionIndex = fractionsData.findIndex(
          (fraction) => fraction.fraction === fractionName
        )
        const modelIndex = fractionsData[fractionIndex].images.findIndex(
          (model) => model.model === modelName
        )

        if (modelIndex !== -1) {
          fractionsData[fractionIndex].images.splice(modelIndex, 1)

          if (fractionsData[fractionIndex].images.length === 0) {
            await deleteFraction(systemName, fractionName)
          } else {
            await updateDoc(docRef, { fractions: fractionsData })
          }
        }

        const newDocSnap = await getDoc(docRef)

        if (newDocSnap.exists()) {
          const newData = newDocSnap.data().fractions
          console.log(newData)
          if (newData.length <= 0) {
            await deleteSystem(systemName)
          }
        }
      }

      await adminStore.deleteImg(systemName, fractionName, modelName)
    } catch (err) {
      console.error(err)
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
    deleteFraction,
    deleteModel
  }
})
