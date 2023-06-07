<script setup>
import BannerEl from '../template/BannerEl.vue'
import ButtonEl from '../template/ButtonEl.vue'
import ModalGallery from '../components/ModalGallery.vue'
import GalleryDisplayEl from '../template/GalleryDisplayEl.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { useAdminStore } from '../stores/AdminStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const adminStore = useAdminStore()
const { data, systems } = storeToRefs(adminStore)

onMounted(async () => {
  await adminStore.getSystems()
  systemBtns.value = [...systemBtns.value, ...systems.value]
})

function chooseSystem(system) {
  switchGallery.value = !switchGallery.value
  if (system === systemBtns.value[0]) {
    currentSystem.value = system
  } else {
    currentSystem.value = system.split(' ').join('-')
  }
}

const systemBtns = ref(['all models'])
const currentSystem = ref('all models')
const switchGallery = ref(true)
</script>
<template>
  <main>
    <BannerEl />

    <section class="btns" v-if="systemBtns.length > 1">
      <ButtonEl
        v-for="system in systemBtns"
        :key="system"
        class="btn--small btn--outline-black btn--slide-black"
        :class="currentSystem === system ? 'active' : ''"
        @click="chooseSystem(system)"
      >
        {{ system }}</ButtonEl
      >
    </section>

    <section v-if="data.length > 0">
      <FadeTransition>
        <div v-if="switchGallery">
          <GalleryDisplayEl :current-system="currentSystem" />
        </div>
        <div v-else>
          <GalleryDisplayEl :current-system="currentSystem" />
        </div>
      </FadeTransition>
    </section>

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
