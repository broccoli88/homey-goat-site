import { defineStore } from 'pinia'
import { useModal } from '../utils/modules/useModal'
import { ref, reactive, computed } from 'vue'
import galleryData from '../data/gallery.json'

export const useGalleryStore = defineStore('galleryStore', () => {
  const systems = reactive(galleryData)

  // ...::: [GALLERY]:::..

  const showAll = ref(true)
  const currentSystem = ref('')

  const filteredSystem = computed(() => {
    return Object.values(systems).filter((s) => {
      if (s.abbr === currentSystem.value) {
        return s
      }
    })[0]
  })

  function findSystem(system) {
    showAll.value = true
    setTimeout(() => {
      currentSystem.value = system.abbr
      showAll.value = false
    }, 10)
  }

  function switchToAll() {
    showAll.value = true
  }
  // ...::: [CAROUSEL]:::..

  // Carousel

  const currentFraction = ref({})
  const orderedCurrentFraction = ref([])

  const currentImg = ref('')
  const count = ref(0)
  const showImgTransition = ref(false)

  const transitionName = ref({
    left: {
      active: false,
      title: 'left'
    },
    right: {
      active: false,
      title: 'right'
    },
    remove: {
      active: false,
      title: 'remove'
    }
  })

  const currentTransition = ref('')

  function checkTransition() {
    currentTransition.value = Object.values(transitionName.value).filter((t) => {
      return t.active
    })[0].title
  }

  function checkIndex(el) {
    return currentFraction.value.findIndex((i) => {
      return i.name === el.name
    })
  }

  function putInOrder() {
    orderedCurrentFraction.value = [
      ...JSON.parse(JSON.stringify(currentFraction.value.slice(count.value))),
      ...JSON.parse(JSON.stringify(currentFraction.value.slice(0, count.value)))
    ]
  }

  function switchImg(el) {
    transitionName.value.right.active = false
    transitionName.value.left.active = false
    transitionName.value.remove.active = true

    checkTransition()

    count.value = checkIndex(el)
    currentImg.value = el
    showImgTransition.value = !showImgTransition.value
    putInOrder()
  }

  function moveRight() {
    transitionName.value.remove.active = false
    transitionName.value.left.active = false
    transitionName.value.right.active = true

    checkTransition()

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

    // console.log(currentTransition.value)
  }

  function moveLeft() {
    transitionName.value.right.active = false
    transitionName.value.remove.active = false
    transitionName.value.left.active = true

    checkTransition()

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

  function toggleModal() {
    showModal.value = !showModal.value
    count.value = checkIndex(currentImg.value)
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
    currentTransition,
    showAll,
    currentSystem,
    filteredSystem,
    findSystem,
    switchToAll,
    toggleModal,
    moveRight,
    moveLeft,
    switchImg
  }
})
