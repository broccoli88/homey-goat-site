import { defineStore } from 'pinia'
import { useModal } from '../utils/modules/useModal'
import { ref, reactive } from 'vue'
import galleryData from '../data/gallery.json'

export const useGalleryStore = defineStore('galleryStore', () => {
  const systems = reactive(galleryData.system)

  // Carousel

  const currentFraction = ref({})
  const orderedCurrentFraction = ref([])

  const currentImg = ref('')
  const count = ref(0)
  const showImgTransition = ref(false)
  const transitionName = ref('')

  function checkIndex() {
    return currentFraction.value.findIndex((i) => {
      return i.name === currentImg.value.name
    })
  }

  function putInOrder() {
    orderedCurrentFraction.value = [
      ...JSON.parse(JSON.stringify(currentFraction.value.slice(count.value))),
      ...JSON.parse(JSON.stringify(currentFraction.value.slice(0, count.value)))
    ]
  }

  function switchImg(el) {
    currentImg.value = el

    count.value = checkIndex()
    const selectedImg = orderedCurrentFraction.value.splice(count.value, 1)
    // orderedCurrentFraction.value.unshift(selectedImg[0])
    // putInOrder()
    console.log(selectedImg)
    // console.log(el)
  }

  const moveRight = () => {
    transitionName.value = 'right'
    count.value++
    if (count.value >= orderedCurrentFraction.value.length) {
      count.value = 0
    }

    const firstEl = orderedCurrentFraction.value.shift()
    showImgTransition.value = !showImgTransition.value
    currentImg.value = currentFraction.value[count.value]
    setTimeout(() => {
      orderedCurrentFraction.value.push(firstEl)
    }, 100)
  }

  const moveLeft = () => {
    transitionName.value = 'left'
    count.value--
    if (count.value < 0) {
      count.value = currentFraction.value.length - 1
    }
    const lastEl = orderedCurrentFraction.value.pop()
    showImgTransition.value = !showImgTransition.value
    currentImg.value = currentFraction.value[count.value]
    setTimeout(() => {
      orderedCurrentFraction.value.unshift(lastEl)
    }, 100)
  }

  //   Opening Modal

  const showModal = ref(false)

  const toggleModal = () => {
    showModal.value = !showModal.value
    count.value = checkIndex()
    putInOrder()
  }

  useModal(showModal)

  return {
    currentImg,
    showModal,
    systems,
    currentFraction,
    count,
    showImgTransition,
    orderedCurrentFraction,
    transitionName,
    toggleModal,
    moveRight,
    moveLeft,
    switchImg
  }
})
