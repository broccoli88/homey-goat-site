import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { ref as vref } from 'vue'
import { db } from '../firebase/db'
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  arrayUnion,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { storageRef } from '../firebase/db'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export const useAdminStore = defineStore('adminStore', () => {
  const modelObj = reactive({
    system: '',
    fraction: '',
    model: '',
    img: '',
    url: ''
  })

  const rules = {
    system: {
      required: helpers.withMessage('Choose existing system or enter new one', required),
      $autoDirty: true
    },
    fraction: {
      required: helpers.withMessage('Choose existing fraction or enter new one', required),
      $autoDirty: true
    },
    model: { required: helpers.withMessage('Enter models name', required), $autoDirty: true },
    img: {
      required: helpers.withMessage('Choose file to upload', required),
      $autoDirty: true
    }
  }

  const v = useVuelidate(rules, modelObj)

  // Disabling NavBar and Footer

  const isMobileView = vref(false)

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      isMobileView.value = false
    } else {
      isMobileView.value = true
    }
  })

  window.addEventListener('load', () => {
    if (window.innerWidth >= 768) {
      isMobileView.value = false
    } else {
      isMobileView.value = true
    }
  })

  // ...::: [ ADMIN PANEL - MESSAGES] :::...

  let messages = vref([])

  async function getMessages() {
    const m = query(collection(db, 'messages'))
    onSnapshot(m, (snap) => {
      messages.value = []
      snap.forEach((doc) => {
        messages.value.push({ ...doc.data(), id: doc.id })
      })
    })
  }

  async function deleteMessage(id) {
    const docRef = doc(db, 'messages', id)
    await deleteDoc(docRef)
  }

  // ...::: [ ADMIN PANEL - GALLERY] :::...

  // Add img form validation

  //   Getting data

  const data = vref([])
  const systems = vref([])
  const fractions = vref([])

  // Getting saved systems and fractions

  async function getSystems() {
    data.value = []
    systems.value = []
    fractions.value = []

    const systemQuery = query(collection(db, 'systems'))
    const systemSnap = await getDocs(systemQuery)

    systemSnap.forEach((system) => {
      data.value.push(system.data())
    })

    data.value.forEach((system) => {
      systems.value.push(system.system)

      system.fractions.forEach((fraction) => {
        fractions.value.push(fraction.fraction)
      })
    })
  }

  // Image upload functions

  async function uploadImg(fileInputRef) {
    //   Storage refs

    const galleryStorageRef = ref(storageRef, 'gallery')
    const modelStorageRef = ref(
      galleryStorageRef,
      `${modelObj.system}/${modelObj.fraction}/${modelObj.model}`
    )

    //   Image upload to storage

    try {
      await uploadBytes(modelStorageRef, fileInputRef.value.files[0])
      await getDownloadURL(modelStorageRef).then((url) => {
        modelObj.url = url
      })
    } catch (err) {
      console.error(err)
    }
  }

  // Data upload to firestore

  async function uploadDataToFireStore() {
    // Model tree

    const newModel = reactive({
      img: modelObj.url,
      model: modelObj.model
    })

    const newFraction = reactive({
      fraction: modelObj.fraction,
      images: [newModel]
    })

    const newSystem = reactive({
      system: modelObj.system,
      fractions: [newFraction]
    })

    // Firestore Refs

    const fractionFbRef = doc(db, 'systems', newSystem.system)

    const fractionSnap = await getDoc(fractionFbRef)

    if (fractionSnap.exists()) {
      const fractionData = fractionSnap.data()
      const existingFraction = fractionData.fractions

      // Check if  the specific fraction exists
      const existingFractionIndex = existingFraction.findIndex(
        (fraction) => fraction.fraction === newFraction.fraction
      )
      if (existingFractionIndex !== -1) {
        existingFraction[existingFractionIndex].images.push(newModel)

        //   Update the document with the modified fraction array
        await updateDoc(fractionFbRef, { fractions: existingFraction })
      } else {
        await updateDoc(fractionFbRef, {
          fractions: arrayUnion(newFraction)
        })
      }
    } else {
      await setDoc(fractionFbRef, newSystem)
    }
  }

  //   Upload compete data

  async function uploadData(fileInputRef) {
    const onFormSubmit = await v.value.$validate()

    if (!onFormSubmit) return

    await uploadImg(fileInputRef)
    await uploadDataToFireStore()

    openModal()

    modelObj.system = ''
    modelObj.fraction = ''
    modelObj.model = ''
    modelObj.img = ''

    v.value.$reset()

    await getSystems()
  }

  //   Show modal after upload

  const showModal = vref(false)

  function openModal() {
    showModal.value = true
  }

  function closeModal() {
    modelObj.system = ''
    modelObj.fraction = ''
    modelObj.model = ''
    modelObj.url = ''
    showModal.value = false
  }

  return {
    isMobileView,
    messages,
    modelObj,
    showModal,
    systems,
    fractions,
    data,
    v,
    getMessages,
    deleteMessage,
    uploadData,
    closeModal,
    getSystems
  }
})
