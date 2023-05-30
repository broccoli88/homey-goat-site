<script setup>
import { useGalleryStore } from '../stores/GalleryStore'
import useImageObserver from '../utils/modules/useImageObserver'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

const props = defineProps(['img', 'set'])

const galleryStore = useGalleryStore()
const { currentImg, currentFraction } = storeToRefs(galleryStore)

const img = ref(props.img.img)
const imginfo = ref(props.set.images)

const openModal = () => {
  currentImg.value = props.img
  currentFraction.value = imginfo.value

  galleryStore.toggleModal()
}

// Intersection Observer
const imageObserver = useImageObserver.observeImages()

onMounted(() => {
  const imgs = document.querySelectorAll('[data-src]')
  imgs.forEach((img) => {
    imageObserver.observe(img)
  })
})
</script>

<template>
  <section class="miniature">
    <section class="miniature__tile">
      <img class="miniature__img" :data-src="img" src="" alt="" />
      <div class="miniature__magnify" @click="openModal" tabindex="0">
        <img class="miniature__magnify-img" src="/svg/eye.svg" alt="" />
      </div>
    </section>
    <section class="miniature__description">
      <p class="miniature__name">
        <slot></slot>
      </p>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.miniature__tile {
  color: $color-white;
  font-size: 1.5rem;

  position: relative;
  cursor: pointer;

  &:hover .miniature__magnify,
  &:focus .miniature__magnify {
    opacity: 1;
  }

  .miniature__img {
    width: 100%;
    object-fit: cover;
    vertical-align: middle;
  }

  .miniature__magnify {
    background-color: hsl(0, 0%, 0%, 0.7);
    display: grid;
    justify-content: center;
    align-items: center;

    position: absolute;
    inset: 0;
    z-index: 1;

    opacity: 0;
    transition: $transition-03;

    &:active .miniature__magnify-img {
      opacity: 0.7;
      scale: 0.9;
    }

    .miniature__magnify-img {
      width: 78px;
    }
  }
}
.miniature__description {
  margin-top: 0.6rem;
  text-transform: capitalize;
}
</style>
