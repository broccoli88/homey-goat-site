import { defineStore } from 'pinia'
import { useModal } from '../utils/modules/useModal'
import { ref, reactive, computed, watch } from 'vue'
import galleryData from '../data/gallery.json'

export const useGalleryStore = defineStore('galleryStore', () => {
  const systems = reactive(galleryData.system)

  // Carousel

  const currentFraction = ref({})
  const currentImg = ref('')
  const count = ref(0)
  const showImgTransition = ref(false)
  //   const proxyArr = reactive([])

  const restOfFraction = computed(() => {
    return currentFraction.value.filter((i) => i.name !== currentImg.value.name)
  })

  const moveRight = () => {
    count.value++
    if (count.value >= currentFraction.value.length) {
      count.value = 0
    }

    showImgTransition.value = !showImgTransition.value
    currentImg.value = currentFraction.value[count.value]
  }

  const moveLeft = () => {
    count.value--
    if (count.value < 0) {
      count.value = currentFraction.value.length - 1
    }
    showImgTransition.value = !showImgTransition.value
    currentImg.value = currentFraction.value[count.value]
  }

  //   Opening Modal

  const showModal = ref(false)

  const toggleModal = () => {
    showModal.value = !showModal.value
    count.value = currentFraction.value.findIndex((i) => {
      return i.name === currentImg.value.name
    })
  }

  useModal(showModal)

  return {
    currentImg,
    showModal,
    systems,
    currentFraction,
    restOfFraction,
    count,
    showImgTransition,
    toggleModal,
    moveRight,
    moveLeft
  }
})
