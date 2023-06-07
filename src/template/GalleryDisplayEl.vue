<script setup>
import GalleryTileEl from '../template/GalleryTileEl.vue'
import { useAdminStore } from '../stores/AdminStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = defineProps(['currentSystem'])
const adminStore = useAdminStore()
const { data } = storeToRefs(adminStore)

const filteredSystem = computed(() => {
  return data.value.filter((s) => s.system === props.currentSystem)
})

const displaySystem = computed(() => {
  return props.currentSystem === 'all models' ? data.value : filteredSystem.value
})
</script>

<template>
  <section>
    <article class="gallery" v-for="{ system, fractions } in displaySystem" :key="system">
      <h2>{{ system }}</h2>
      <section v-for="{ fraction, images } in fractions" :key="fraction" class="gallery__fraction">
        <h3 class="gallery__fraction-title">{{ fraction }}</h3>
        <GalleryTileEl v-for="{ model, img } in images" :key="model" :model="img" :set="images">
          {{ model }}
        </GalleryTileEl>
      </section>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.gallery {
  margin-block: 2vw;

  .gallery__fraction {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
    gap: 1vw;

    margin-block: 2vw;

    .gallery__fraction-title {
      grid-column: 1 / -1;
    }
  }
}
</style>
