<script setup>
import BannerEl from '../template/BannerEl.vue'
import GalleryTileEl from '../template/GalleryTileEl.vue'
import ButtonEl from '../template/ButtonEl.vue'
import ImageModal from '../components/ImageModal.vue'
import { useGalleryStore } from '../stores/GalleryStore'
import { storeToRefs } from 'pinia'

const galleryStore = useGalleryStore()
const { systems } = storeToRefs(galleryStore)
</script>
<template>
  <main>
    <BannerEl />
    <section class="btns">
      <ButtonEl
        v-for="system in systems"
        :key="system.system"
        class="btn--small btn--outline-black btn--slide-black"
      >
        {{ system.system }}</ButtonEl
      >
    </section>
    <section class="gallery" v-for="system in systems" :key="system.system">
      <h2>{{ system.system }}</h2>
      <section v-for="fraction in system.fraction" :key="fraction.title" class="gallery__fraction">
        <h3 class="gallery__fraction-title">{{ fraction.title }}</h3>
        <GalleryTileEl
          v-for="miniature in fraction.images"
          :key="miniature.name"
          :img="miniature"
          :set="fraction"
        >
        </GalleryTileEl>
      </section>
    </section>
    <ImageModal />
  </main>
</template>

<style lang="scss" scoped>
main {
  @include container;

  .btns {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }

  .gallery {
    padding-inline: 1.5rem;
    margin-top: 5vw;

    .gallery__fraction {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
      gap: 0.5rem;

      margin-top: 3vw;

      .gallery__fraction-title {
        grid-column: 1 / -1;
      }
    }
  }
}
</style>
