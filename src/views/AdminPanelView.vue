<script setup>
import { ref } from 'vue'
import AdminNav from '../components/AdminNav.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { RouterView } from 'vue-router'

const isMobileView = ref(false)

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    isMobileView.value = false
  } else {
    isMobileView.value = true
  }
})

window.addEventListener('load', () => {
  if (window.innerWidth >= 768) {
    isMobileView.value = false
  } else {
    isMobileView.value = true
  }
})
</script>

<template>
  <main class="panel" v-if="!isMobileView">
    <AdminNav />
    <section class="panel__section">
      <h1 class="panel__heading">Admin Panel</h1>
      <router-view v-slot="{ Component }">
        <FadeTransition>
          <component :is="Component" />
        </FadeTransition>
      </router-view>
    </section>
  </main>
  <div class="mobile-view" v-else>
    <h1>Mobile view is not available</h1>
    <h3>This app is meant for devices 768px wide and more</h3>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  display: grid;
  align-items: start;
  grid-template-columns: auto 1fr;

  .panel__heading {
    margin-top: 3vw;
    margin-left: 2vw;
  }
}

.mobile-view {
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
  display: grid;
  place-content: center;
  gap: 4rem;
  text-align: center;
}
</style>
