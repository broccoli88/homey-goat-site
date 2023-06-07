<script setup>
import ButtonEl from '../template/ButtonEl.vue'
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
    currentSystem.value = system
  }
}

const systemBtns = ref(['all models'])
const currentSystem = ref('all models')
const switchGallery = ref(true)
</script>

<template>
  <section class="container">
    <h3>Manage Gallery</h3>
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
    </section>
  </section>
</template>

<style lang="scss" scoped>
.container {
  margin: $margin-admin;
}
.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 5vw;
}

.active {
  background-color: $color-black;
  color: $color-white;
}
</style>
