import { defineStore } from 'pinia'
import { db } from '../firebase/db'
import { doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { useAdminStore } from './AdminStore'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

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

  const showDeleteModal = ref(false)

  function toggleDeleteModal(systemName, fractionName = '', modelName = '') {
    showDeleteModal.value = true

    deleteInfo.value.system.title = systemName
    deleteInfo.value.fraction.title = fractionName
    deleteInfo.value.model.title = modelName

    if (fractionName === '' && modelName === '') {
      deleteInfo.value.system.toDelete = true
      deleteInfo.value.fraction.toDelete = false
      deleteInfo.value.model.toDelete = false
    } else if (fractionName !== '' && modelName === '') {
      deleteInfo.value.system.toDelete = false
      deleteInfo.value.fraction.toDelete = true
      deleteInfo.value.model.toDelete = false
    } else if (fractionName !== '' && modelName !== '') {
      deleteInfo.value.system.toDelete = false
      deleteInfo.value.fraction.toDelete = false
      deleteInfo.value.model.toDelete = true
    }
  }

  async function submitDelete() {
    if (deleteInfo.value.system.toDelete) {
      await deleteSystem()
    } else if (deleteInfo.value.fraction.toDelete) {
      await deleteFraction()
    } else if (deleteInfo.value.model.toDelete) {
      await deleteModel()
    }

    showDeleteModal.value = false
  }

  function closeDeleteModal() {
    showDeleteModal.value = false
  }

  async function deleteSystem() {
    const systemRef = doc(db, 'systems', deleteInfo.value.system.title)

    try {
      await deleteDoc(systemRef)
    } catch (err) {
      console.error(err)
    }
  }

  //   Delete fraction

  async function deleteFraction() {
    const docRef = doc(db, 'systems', deleteInfo.value.system.title)
    const docSnap = await getDoc(docRef)

    try {
      if (docSnap.exists()) {
        const data = docSnap.data()
        const fractionsData = data.fractions
        const index = fractionsData.findIndex(
          (fraction) => fraction.fraction === deleteInfo.value.fraction.title
        )

        if (index !== -1) {
          fractionsData.splice(index, 1)
          await updateDoc(docRef, { fractions: fractionsData })
        }
      } else {
        console.log('Document does not exist')
      }
    } catch (err) {
      console.error(err)
    }
  }

  //   Delete model

  async function deleteModel() {
    try {
      const docRef = doc(db, 'systems', deleteInfo.value.system.title)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        const fractionsData = [...data.fractions]
        const fractionIndex = fractionsData.findIndex(
          (fraction) => fraction.fraction === deleteInfo.value.fraction.title
        )
        const modelIndex = fractionsData[fractionIndex].images.findIndex(
          (model) => model.model === deleteInfo.value.model.title
        )

        if (modelIndex !== -1) {
          fractionsData[fractionIndex].images.splice(modelIndex, 1)

          if (fractionsData[fractionIndex].images.length === 0) {
            deleteInfo.value.system.toDelete = false
            deleteInfo.value.fraction.toDelete = true
            deleteInfo.value.model.toDelete = false
            await deleteFraction()
          } else {
            await updateDoc(docRef, { fractions: fractionsData })
          }
        }

        const newDocSnap = await getDoc(docRef)

        if (newDocSnap.exists()) {
          const newData = newDocSnap.data().fractions

          if (newData.length <= 0) {
            deleteInfo.value.system.toDelete = true
            deleteInfo.value.fraction.toDelete = false
            deleteInfo.value.model.toDelete = false
            await deleteSystem(deleteInfo.value.model.title)
          }
        }
      }

      await adminStore.deleteImg(
        deleteInfo.value.system.title,
        deleteInfo.value.fraction.title,
        deleteInfo.value.model.title
      )
    } catch (err) {
      console.error(err)
    }
  }

  // --- UPDATE operations ---

  //  Update verification

  const newName = ref({
    newName: ''
  })
  const rules = {
    newName: { required: helpers.withMessage('You must enter a name...', required) }
  }

  const v = useVuelidate(rules, newName.value)

  function submitNameChange() {
    const isFormCorrect = v.value.$validate()

    if (!isFormCorrect) return
  }

  async function renameSystem(systemName) {
    const systemNameRef = doc(db, 'systems', systemName)

    await updateDoc(systemNameRef, { system: newName.value })
  }
  async function renameFraction(systemName, fractionName) {
    // const modelsNameRef = doc(db, 'systems', systemName)

    console.log(systemName, fractionName)
  }
  async function renameModel(systemName, fractionName, modelName) {
    // const modelsNameRef = doc(db, 'systems', systemName)

    console.log(systemName, fractionName, modelName)
  }

  return {
    // Modal
    isInAdminPanel,
    showModal,
    currentChange,
    closeModal,
    // Delete
    showDeleteModal,
    deleteInfo,
    deleteSystem,
    deleteFraction,
    deleteModel,
    toggleDeleteModal,
    closeDeleteModal,
    submitDelete,
    // Rename
    newName,
    renameSystem,
    renameFraction,
    renameModel
  }
})
