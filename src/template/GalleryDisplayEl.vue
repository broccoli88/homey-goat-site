<script setup>
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import GalleryTileEl from '../template/GalleryTileEl.vue'
import GalleryOptionsWindowEl from '../template/GalleryOptionsWindowEl.vue'
import { useAdminStore } from '../stores/AdminStore'
import { useAdminGalleryStore } from '../stores/AdminGalleryStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

const props = defineProps(['currentSystem'])
const adminStore = useAdminStore()
const { data } = storeToRefs(adminStore)

const adminGalleryStore = useAdminGalleryStore()
const { deleteInfo } = storeToRefs(adminGalleryStore)

const filteredSystem = computed(() => {
  return data.value.filter((s) => s.system === props.currentSystem)
})

const displaySystem = computed(() => {
  return props.currentSystem === 'all models' ? data.value : filteredSystem.value
})

onMounted(() => {
  //   console.log(data.value)
})

// Delete Function
</script>

<template>
  <section>
    <article class="gallery" v-for="{ system, fractions } in displaySystem" :key="system">
      <header class="gallery__header">
        <h2>{{ system }}</h2>
        <FadeTransition>
          <GalleryOptionsWindowEl
            class="display-system-icon"
            @emit-delete="adminGalleryStore.deleteSystem(system)"
          />
        </FadeTransition>
      </header>
      <div>
        <section
          v-for="{ fraction, images } in fractions"
          :key="fraction"
          class="gallery__fraction"
        >
          <div class="gallery__fraction-title">
            <h3>{{ fraction }}</h3>
            <GalleryOptionsWindowEl
              class="display-fraction-icon"
              @emit-delete="adminGalleryStore.deleteFraction(system, fraction)"
            />
          </div>
          <GalleryTileEl
            @emit-delete="adminGalleryStore.deleteModel(system, fraction, model)"
            v-for="{ model, img } in images"
            :key="model"
            :model="img"
            :set="images"
          >
            <p>{{ model }}</p>
          </GalleryTileEl>
        </section>
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.gallery {
  margin-block: 2vw;

  .gallery__fraction-title,
  .gallery__header {
    display: flex;
    gap: 2rem;

    .display-system-icon,
    .display-fraction-icon {
      opacity: 0;
      transition: $transition-04;
    }

    &:hover {
      .display-system-icon,
      .display-fraction-icon {
        opacity: 1;
      }
    }

    .gallery__option-btns {
      display: flex;
      width: clamp(2rem, 1rem + 1.4vw, 2.6rem);
      aspect-ratio: 1;
      cursor: pointer;
    }
  }

  .gallery__fraction {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
    gap: 1vw;

    margin-block: 2vw;

    .gallery__fraction-title {
      grid-column: 1 / -1;
      margin-bottom: 1rem;
    }
  }
}
</style>
