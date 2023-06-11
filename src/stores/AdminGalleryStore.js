import { defineStore } from 'pinia'
import { db } from '../firebase/db'
import { doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore'
import { reactive, ref } from 'vue'
import { useAdminStore } from './AdminStore'
import { storageRef } from '../firebase/db'
import { uploadBytes, getDownloadURL } from 'firebase/storage'
import { ref as fref } from 'firebase/storage'

export const useAdminGalleryStore = defineStore('adminGalleryStore', () => {
  const adminStore = useAdminStore()

  //   ...::: [ ADMIN PANEL ] :::...

  const isInAdminPanel = ref(false)

  // --- DELETE operations ---

  const fieldInfo = reactive({
    system: {
      title: '',
      id: '',
      toChange: false
    },
    fraction: {
      title: '',
      toChange: false
    },
    model: {
      title: '',
      url: '',
      toChange: false
    }
  })
  //   Delete system

  const showDeleteModal = ref(false)

  // Modal confirmation

  function openDeleteModal(systemName, systemId, fractionName = '', modelName = '') {
    showDeleteModal.value = true

    fieldInfo.system.title = systemName
    fieldInfo.system.id = systemId
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
    closeDeleteModal()
  }

  function closeDeleteModal() {
    showDeleteModal.value = false
    newName.value = ''
    fieldInfo.system.title = ''
    fieldInfo.system.id = ''
    fieldInfo.fraction.title = ''
    fieldInfo.model.title = ''
    fieldInfo.system.toChange = false
    fieldInfo.fraction.toChange = false
    fieldInfo.model.toChange = false
  }

  async function deleteSystem() {
    const systemRef = doc(db, 'systems', fieldInfo.system.id)

    try {
      await deleteDoc(systemRef)
    } catch (err) {
      console.error(err)
    }
  }

  //   Delete fraction

  async function deleteFraction() {
    const docRef = doc(db, 'systems', fieldInfo.system.id)

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
    const docRef = doc(db, 'systems', fieldInfo.system.id)
    try {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        const fractionsData = [...data.fractions]
        const fractionIndex = fractionsData.findIndex(
          (fraction) => fraction.fraction === fieldInfo.fraction.title
        )

        if (fractionIndex !== -1) {
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
          } else {
            console.log('Model does not exist')
          }
        } else {
          console.log('Fraction does not exist')
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
      } else {
        console.log('Document does not exist')
      }

      await adminStore.deleteImg(
        fieldInfo.system.id,
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

  function openRenameModal(systemName, systemId, fractionName = '', modelName = '') {
    showRenameModal.value = true

    fieldInfo.system.title = systemName
    fieldInfo.system.id = systemId
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
  }

  function closeRenameModal() {
    showRenameModal.value = false
    newName.value = ''
    fieldInfo.system.title = ''
    fieldInfo.system.id = ''
    fieldInfo.fraction.title = ''
    fieldInfo.model.title = ''
    fieldInfo.system.toChange = false
    fieldInfo.fraction.toChange = false
    fieldInfo.model.toChange = false
  }

  async function submitRename() {
    if (newName.value === '') return

    if (fieldInfo.system.toChange) {
      await renameSystem()
    } else if (fieldInfo.fraction.toChange) {
      await renameFraction()
    } else if (fieldInfo.model.toChange) {
      await renameModel()
    }

    closeRenameModal()
  }

  //  --- Update functions ---

  //   Update system name

  async function renameSystem() {
    const systemNameRef = doc(db, 'systems', fieldInfo.system.id)
    try {
      await updateDoc(systemNameRef, { system: newName.value })
    } catch (err) {
      console.error(err)
    }
  }

  //   Update fraction name

  async function renameFraction() {
    const fractionsNameRef = doc(db, 'systems', fieldInfo.system.id)

    try {
      const fractionsNameSnap = await getDoc(fractionsNameRef)
      if (fractionsNameSnap.exists()) {
        const fractionsNameData = fractionsNameSnap.data().fractions
        const fractionsIndex = fractionsNameData.findIndex(
          (fraction) => fraction.fraction === fieldInfo.fraction.title
        )

        if (fractionsIndex !== -1) {
          fractionsNameData[fractionsIndex].fraction = newName.value
          await updateDoc(fractionsNameRef, { fractions: fractionsNameData })
        } else {
          console.log('Document does not exist')
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  //   Update model name
  async function renameModel() {
    const modelsNameRef = doc(db, 'systems', fieldInfo.system.id)

    try {
      const modelsNameSnap = await getDoc(modelsNameRef)

      if (modelsNameSnap.exists()) {
        const fractionsNameData = modelsNameSnap.data().fractions
        const fractionsIndex = fractionsNameData.findIndex(
          (fraction) => fraction.fraction === fieldInfo.fraction.title
        )

        if (fractionsIndex !== -1) {
          const modelsIndex = fractionsNameData[fractionsIndex].images.findIndex(
            (model) => model.model === fieldInfo.model.title
          )

          if (modelsIndex !== -1) {
            fractionsNameData[fractionsIndex].images[modelsIndex].model = newName.value

            await updateDoc(modelsNameRef, {
              fractions: fractionsNameData
            })
          } else {
            console.log('Model does not exist')
          }
        } else {
          console.log('Fraction does not exist')
        }
      } else {
        console.log('Document does not exist')
      }
    } catch (err) {
      console.error(err)
    }
  }

  //   Update image

  const showUpdateImageModal = ref(false)

  function openUpdateImageModal(systemName, systemId, fractionName, modelName, modelUrl) {
    showUpdateImageModal.value = true

    fieldInfo.system.title = systemName
    fieldInfo.system.id = systemId
    fieldInfo.fraction.title = fractionName
    fieldInfo.model.title = modelName
    fieldInfo.model.url = modelUrl
  }

  function closeUpdateImageModal() {
    showUpdateImageModal.value = false
    fieldInfo.system.title = ''
    fieldInfo.system.id = ''
    fieldInfo.fraction.title = ''
    fieldInfo.model.title = ''
    fieldInfo.model.url = ''
  }

  async function uploadNewImage(newImageRef) {
    const galleryStorageRef = fref(storageRef, 'gallery')
    const modelStorageRef = fref(
      galleryStorageRef,
      `${fieldInfo.system.id}/${fieldInfo.fraction.title}/${fieldInfo.model.title}`
    )

    try {
      await uploadBytes(modelStorageRef, newImageRef.value.files[0])
      await getDownloadURL(modelStorageRef).then((url) => {
        fieldInfo.model.url = url
      })
    } catch (err) {
      console.error(err)
    }
  }

  async function submitUpdateImage(newImageRef) {
    try {
      await adminStore.deleteImg(
        fieldInfo.system.id,
        fieldInfo.fraction.title,
        fieldInfo.model.title
      )

      //   await uploadNewImage(newImageRef)

      //   const modelsNameRef = doc(db, 'systems', fieldInfo.system.id)

      //   const modelsNameSnap = await getDoc(modelsNameRef)

      //   if (modelsNameSnap.exists()) {
      //     const fractionsNameData = modelsNameSnap.data().fractions
      //     const fractionsIndex = fractionsNameData.findIndex(
      //       (fraction) => fraction.fraction === fieldInfo.fraction.title
      //     )

      //     if (fractionsIndex !== -1) {
      //       const modelsIndex = fractionsNameData[fractionsIndex].images.findIndex(
      //         (model) => model.model === fieldInfo.model.title
      //       )

      //       if (modelsIndex !== -1) {
      //         fractionsNameData[fractionsIndex].images[modelsIndex].img = fieldInfo.model.url

      //         await updateDoc(modelsNameRef, {
      //           fractions: fractionsNameData
      //         })
      //       } else {
      //         console.log('Model does not exist')
      //       }
      //     } else {
      //       console.log('Fraction does not exist')
      //     }
      //   } else {
      //     console.log('Document does not exist')
      //   }

      //   closeUpdateImageModal()
    } catch (err) {
      console.error(err)
    }
  }

  return {
    // Modal
    isInAdminPanel,
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
    showRenameModal,
    renameSystem,
    renameFraction,
    renameModel,
    submitRename,
    // Update image
    showUpdateImageModal,
    openUpdateImageModal,
    closeUpdateImageModal,
    submitUpdateImage
  }
})
