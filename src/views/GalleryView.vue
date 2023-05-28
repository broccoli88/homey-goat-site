<script setup>
import BannerEl from '../template/BannerEl.vue'
import GalleryTileEl from '../template/GalleryTileEl.vue'
import galleryData from '../data/gallery.json'
import { reactive } from 'vue'

const gallery = reactive(galleryData)

const systems = reactive(gallery.system)

console.log(gallery)
</script>
<template>
  <main>
    <BannerEl />
    <section class="gallery" v-for="system in systems" :key="system.system">
      <h2>{{ system.system }}</h2>
      <section v-for="fraction in system.fraction" :key="fraction.title">
        <h3>{{ fraction.title }}</h3>
        <GalleryTileEl
          v-for="miniature in fraction.images"
          :key="miniature.name"
          :img="miniature.img"
          >{{ miniature.name }}
        </GalleryTileEl>
      </section>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  @include container;
}
</style>
