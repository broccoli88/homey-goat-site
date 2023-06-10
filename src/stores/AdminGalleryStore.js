import { defineStore } from 'pinia'
import { db } from '../firebase/db'
import { doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore'
import { reactive, ref } from 'vue'
import { useAdminStore } from './AdminStore'

export const useAdminGalleryStore = defineStore('adminGalleryStore', () => {
  const adminStore = useAdminStore()

  //   ...::: [ ADMIN PANEL ] :::...

  const isInAdminPanel = ref(false)

  // --- DELETE operations ---

  const fieldInfo = reactive({
    system: {
      title: '',
      toChange: false
    },
    fraction: {
      title: '',
      toChange: false
    },
    model: {
      title: '',
      toChange: false
    }
  })
  //   Delete system

  const showDeleteModal = ref(false)

  // Modal confirmation

  function openDeleteModal(systemName, fractionName = '', modelName = '') {
    showDeleteModal.value = true

    fieldInfo.system.title = systemName
    fieldInfo.fraction.title = fractionName
    fieldInfo.model.title = modelName

    if (fractionName === '' && modelName === '') {
      fieldInfo.system.toChange = true
      fieldInfo.fraction.toChange = false
      fieldInfo.model.toChange = false
    } else if (fractionName !== '' && modelName === '') {
      fieldInfo.system.toChange = false
      fieldInfo.fraction.toChange = true
      fieldInfo.model.toChange = false
    } else if (fractionName !== '' && modelName !== '') {
      fieldInfo.system.toChange = false
      fieldInfo.fraction.toChange = false
      fieldInfo.model.toChange = true
    }
  }

  async function submitDelete() {
    if (fieldInfo.system.toChange) {
      await deleteSystem()
    } else if (fieldInfo.fraction.toChange) {
      await deleteFraction()
    } else if (fieldInfo.model.toChange) {
      await deleteModel()
    }

    showDeleteModal.value = false
  }

  function closeDeleteModal() {
    showDeleteModal.value = false
  }

  async function deleteSystem() {
    const systemRef = doc(db, 'systems', fieldInfo.system.title)

    try {
      await deleteDoc(systemRef)
    } catch (err) {
      console.error(err)
    }
  }

  //   Delete fraction

  async function deleteFraction() {
    const docRef = doc(db, 'systems', fieldInfo.system.title)

    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        const fractionsData = data.fractions
        const index = fractionsData.findIndex(
          (fraction) => fraction.fraction === fieldInfo.fraction.title
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
      const docRef = doc(db, 'systems', fieldInfo.system.title)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        const fractionsData = [...data.fractions]
        const fractionIndex = fractionsData.findIndex(
          (fraction) => fraction.fraction === fieldInfo.fraction.title
        )
        const modelIndex = fractionsData[fractionIndex].images.findIndex(
          (model) => model.model === fieldInfo.model.title
        )

        if (modelIndex !== -1) {
          fractionsData[fractionIndex].images.splice(modelIndex, 1)

          if (fractionsData[fractionIndex].images.length === 0) {
            fieldInfo.system.toChange = false
            fieldInfo.fraction.toChange = true
            fieldInfo.model.toChange = false
            await deleteFraction()
          } else {
            await updateDoc(docRef, { fractions: fractionsData })
          }
        }

        const newDocSnap = await getDoc(docRef)

        if (newDocSnap.exists()) {
          const newData = newDocSnap.data().fractions

          if (newData.length <= 0) {
            fieldInfo.system.toChange = true
            fieldInfo.fraction.toChange = false
            fieldInfo.model.toChange = false
            await deleteSystem(fieldInfo.model.title)
          }
        }
      }

      await adminStore.deleteImg(
        fieldInfo.system.title,
        fieldInfo.fraction.title,
        fieldInfo.model.title
      )
    } catch (err) {
      console.error(err)
    }
  }

  // --- UPDATE operations ---

  // Modal confirmation

  const newName = ref('')
  const elementToRename = ref('')
  const showRenameModal = ref(false)

  function openRenameModal(systemName, fractionName = '', modelName = '') {
    showRenameModal.value = true

    fieldInfo.system.title = systemName
    fieldInfo.fraction.title = fractionName
    fieldInfo.model.title = modelName

    if (fractionName === '' && modelName === '') {
      fieldInfo.system.toChange = true
      fieldInfo.fraction.toChange = false
      fieldInfo.model.toChange = false
      elementToRename.value = 'system'
    } else if (fractionName !== '' && modelName === '') {
      fieldInfo.system.toChange = false
      fieldInfo.fraction.toChange = true
      fieldInfo.model.toChange = false
      elementToRename.value = 'fraction'
    } else if (fractionName !== '' && modelName !== '') {
      fieldInfo.system.toChange = false
      fieldInfo.fraction.toChange = false
      fieldInfo.model.toChange = true
      elementToRename.value = 'model'
    }

    console.log(fieldInfo)
  }

  function closeRenameModal() {
    showRenameModal.value = false
  }

  async function submitRename() {
    if (fieldInfo.system.toChange) {
      await renameSystem()
    } else if (fieldInfo.fraction.toChange) {
      await renameFraction()
    } else if (fieldInfo.model.toChange) {
      await renameModel()
    }

    showRenameModal.value = false
  }

  // Update functions

  async function renameSystem() {
    const systemNameRef = doc(db, 'systems', fieldInfo.system.title)
    try {
      await updateDoc(systemNameRef, { system: newName.value })
    } catch (err) {
      console.error(err)
    }
  }
  async function renameFraction() {
    const fractionNameRef = doc(db, 'systems', fieldInfo.fraction.title)

    try {
      const fractionNameRef = getDoc(fractionNameRef)
    } catch (err) {
      console.error(err)
    }
  }
  async function renameModel(systemName, fractionName, modelName) {
    // const modelsNameRef = doc(db, 'systems', systemName)

    console.log(systemName, fractionName, modelName)
  }

  return {
    // Modal
    isInAdminPanel,
    showRenameModal,
    closeRenameModal,
    openRenameModal,
    // Delete
    showDeleteModal,
    fieldInfo,
    deleteSystem,
    deleteFraction,
    deleteModel,
    openDeleteModal,
    closeDeleteModal,
    submitDelete,
    // Rename
    newName,
    elementToRename,
    renameSystem,
    renameFraction,
    renameModel,
    submitRename
  }
})
