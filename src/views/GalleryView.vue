<script setup>
import BannerEl from '../template/BannerEl.vue'
import GalleryTileEl from '../template/GalleryTileEl.vue'
import ButtonEl from '../template/ButtonEl.vue'
import ModalGallery from '../components/ModalGallery.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { useAdminStore } from '../stores/AdminStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

const adminStore = useAdminStore()
const { data, systems } = storeToRefs(adminStore)

onMounted(() => {
  adminStore.getSystems()
})

const showAll = ref(true)

function switchToAll() {
  showAll.value = true
  choosenSystem.value = ''
}

const choosenSystem = ref('')
const chooseSystem = (system) => {
  showAll.value = true
  setTimeout(() => {
    choosenSystem.value = system
    showAll.value = false
  }, 10)
}

const filteredSystem = computed(() => {
  return data.value.filter((s) => s.system === choosenSystem.value.split(' ').join('-'))
})
</script>
<template>
  <main>
    <BannerEl />

    <section class="btns">
      <ButtonEl
        class="btn--small btn--outline-black btn--slide-black"
        :class="showAll ? 'active' : ''"
        @click="switchToAll"
        >All Models</ButtonEl
      >
      <ButtonEl
        v-for="system in systems"
        :key="system"
        class="btn--small btn--outline-black btn--slide-black"
        :class="system === choosenSystem ? 'active' : ''"
        @click="chooseSystem(system)"
      >
        {{ system }}</ButtonEl
      >
    </section>
    <FadeTransition>
      <div v-if="showAll">
        <section class="gallery" v-for="{ system, fractions } in data" :key="system">
          <h2>{{ system }}</h2>
          <section
            v-for="{ fraction, images } in fractions"
            :key="fraction"
            class="gallery__fraction"
          >
            <h3 class="gallery__fraction-title">{{ fraction }}</h3>
            <GalleryTileEl v-for="{ model, img } in images" :key="model" :model="img" :set="images">
              {{ model }}
            </GalleryTileEl>
          </section>
        </section>
      </div>
      <section class="gallery" v-else>
        <h2>{{ filteredSystem[0].system }}</h2>
        <section
          v-for="fraction in filteredSystem[0].fractions"
          :key="fraction.fraction"
          class="gallery__fraction"
        >
          <h3 class="gallery__fraction-title">{{ fraction.fraction }}</h3>
          <GalleryTileEl
            v-for="model in fraction.images"
            :key="model.model"
            :model="model.img"
            :set="fraction.images"
          >
            {{ model.model }}
          </GalleryTileEl>
        </section>
      </section>
    </FadeTransition>
    <ModalGallery />
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
