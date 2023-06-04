import { defineStore } from 'pinia'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
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

export const useAdminStore = defineStore('adminStore', () => {
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

  // ...::: [LOGIN VALIDATION ] :::...

  const adminState = reactive({
    username: '',
    password: {
      password: '',
      confirmPassword: ''
    }
  })

  const rules = {
    username: {
      required: helpers.withMessage('State your username human!', required),
      minLength: minLength(3),
      maxLength: maxLength(20),
      $autoDirty: true
    },
    password: {
      password: {
        required: helpers.withMessage('Enter password...', required),
        minLength: minLength(3),
        maxLength: maxLength(20),
        $autoDirty: true
      },
      confirmPassword: {
        required: helpers.withMessage('Repeat password...', required),
        sameAs: helpers.withMessage(
          'Input must be the same as password',
          sameAs(() => adminState.password.password)
        ),
        $autoDirty: true
      }
    }
  }

  const v = useVuelidate(rules, adminState)

  async function handleLogIn() {
    const isLoginCorrect = v.value.$validate()

    if (!isLoginCorrect) return
  }

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

  const data = vref([])
  const systems = vref(['Warmachine and Hordes', 'Warhammer 40k'])
  const fractions = vref(['Cygnar', 'Protectorate of Menoth', 'Space Marines'])

  //   Getting data

  const modelAssignement = reactive({
    system: '',
    fraction: '',
    model: '',
    url: ''
  })

  // refactoring strings for appropriate name for firebase and storaage

  const systemName = computed(() => {
    return modelAssignement.system.split(' ').join('-').toLowerCase()
  })

  const fractionName = computed(() => {
    return modelAssignement.fraction.split(' ').join('-').toLowerCase()
  })

  const modelName = computed(() => {
    return modelAssignement.model.split(' ').join('-').toLowerCase()
  })

  // Getting saved systems and fractions

  async function getSystems() {
    systems.value = []
    fractions.value = []

    const systemQuery = query(collection(db, 'systems'))
    const systemSnap = await getDocs(systemQuery)

    systemSnap.forEach((system) => {
      data.value.push(system.data())
    })

    systems.value = data.value.map((item) => {
      return item.system.split('-').join(' ')
    })

    data.value.forEach((i) => {
      //   console.log(i.fractions)
      i.fractions.forEach((f) => {
        fractions.value.push(Object.keys(f).toString().split('-').join(' '))
      })
    })

    // console.log(data.value)
  }

  // Image upload functions

  async function uploadImg(fileInputRef) {
    //   Storage refs
    const galleryStorageRef = ref(storageRef, 'gallery')
    const modelStorageRef = ref(
      galleryStorageRef,
      `${systemName.value}/${fractionName.value}/${modelName.value}`
    )

    //   Image upload to storage

    try {
      await uploadBytes(modelStorageRef, fileInputRef.value.files[0])
      await getDownloadURL(modelStorageRef).then((url) => {
        modelAssignement.url = url
      })
    } catch (err) {
      console.error(err)
    }
  }

  // Data upload to firestore

  async function uploadDataToFireStore() {
    // Model tree

    const newModel = reactive({
      img: modelAssignement.url,
      model: modelName.value
    })

    const newFraction = reactive({
      fraction: fractionName.value,
      images: [newModel]
    })

    const newSystem = reactive({
      system: systemName.value,
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
    // await uploadImg(fileInputRef)
    await uploadDataToFireStore()

    openModal()
  }

  //   Show modal after upload

  const showModal = vref(false)

  function openModal() {
    showModal.value = true
  }

  function closeModal() {
    modelAssignement.system = ''
    modelAssignement.fraction = ''
    modelAssignement.model = ''
    modelAssignement.url = ''
    showModal.value = false
  }

  return {
    isMobileView,
    v,
    adminState,
    messages,
    modelAssignement,
    showModal,
    systems,
    fractions,
    data,
    handleLogIn,
    getMessages,
    deleteMessage,
    uploadData,
    closeModal,
    getSystems
  }
})
