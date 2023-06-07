<script setup>
import { useGalleryStore } from '../stores/GalleryStore'
import useImageObserver from '../utils/modules/useImageObserver'
import { storeToRefs } from 'pinia'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps(['model', 'set'])

const galleryStore = useGalleryStore()
const { currentModel, currentFraction } = storeToRefs(galleryStore)

const openModal = () => {
  currentModel.value = props.model
  currentFraction.value = props.set

  galleryStore.toggleModal()
}

const route = useRoute()
const displayDeleteButton = ref(false)

// Intersection Observer

const imgRef = ref(null)
const imageObserver = useImageObserver.observeImages()

onMounted(() => {
  imageObserver.observe(imgRef.value)
})
</script>

<template>
  <section class="miniature">
    <div class="delete" v-if="displayDeleteButton">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="black"
          stroke-linecap="round"
          stroke-width="1.5"
          d="m14.5 9.5l-5 5m0-5l5 5M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
        />
      </svg>
    </div>
    <section class="miniature__tile">
      <img class="miniature__img" :data-src="model" alt="" ref="imgRef" />
      <div class="miniature__magnify" @click="openModal" tabindex="0">
        <img class="miniature__magnify-img" src="/svg/eye.svg" alt="" />
      </div>
    </section>
    <section class="miniature__description">
      <p>
        <slot></slot>
      </p>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.miniature {
  position: relative;

  .delete {
    position: absolute;
    top: -15px;
    right: -15px;
    z-index: 999;

    background-color: white;
    display: flex;
    border-radius: 10px;
    cursor: pointer;

    box-shadow: $box-shadow-5;
  }
}

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
    box-shadow: $box-shadow-5;
    border-radius: 7px;
  }

  .miniature__magnify {
    background-color: hsl(0, 0%, 0%, 0.7);
    border-radius: 7px;

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
