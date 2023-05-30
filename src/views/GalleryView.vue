<script setup>
import BannerEl from '../template/BannerEl.vue'
import GalleryTileEl from '../template/GalleryTileEl.vue'
import ButtonEl from '../template/ButtonEl.vue'
import ImageModal from '../components/ImageModal.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { useGalleryStore } from '../stores/GalleryStore'
import { storeToRefs } from 'pinia'

const galleryStore = useGalleryStore()
const { systems, showAll, filteredSystem, currentSystem } = storeToRefs(galleryStore)
</script>
<template>
  <main>
    <BannerEl />
    <section class="btns">
      <ButtonEl
        class="btn--small btn--outline-black btn--slide-black"
        :class="showAll ? 'active' : ''"
        @click="galleryStore.switchToAll"
        >All Models</ButtonEl
      >
      <ButtonEl
        @click="galleryStore.findSystem(system)"
        v-for="system in systems"
        :key="system.system"
        class="btn--small btn--outline-black btn--slide-black"
        :class="system.abbr === currentSystem && !showAll ? 'active' : ''"
      >
        {{ system.system }}</ButtonEl
      >
    </section>
    <FadeTransition>
      <div v-if="showAll">
        <section class="gallery" v-for="system in systems" :key="system.system">
          <h2>{{ system.system }}</h2>
          <section
            v-for="fraction in system.fraction"
            :key="fraction.title"
            class="gallery__fraction"
          >
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
      </div>
      <section class="gallery" v-else>
        <h2>{{ filteredSystem.system }}</h2>
        <section
          v-for="fraction in filteredSystem.fraction"
          :key="fraction.title"
          class="gallery__fraction"
        >
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
    </FadeTransition>
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
    margin-top: 5vw;
  }

  .gallery {
    padding-inline: 1.5rem;
    margin-top: 2vw;

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

.active {
  background-color: $color-black;
  color: $color-white;
}
</style>
