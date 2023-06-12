<script setup>
import FadeTransition from './utils/transitions/FadeTransition.vue'
import Navbar from './components/NavBar.vue'
import FooTer from './components/FooTer.vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { useAdminGalleryStore } from './stores/AdminGalleryStore'
import { useAdminStore } from './stores/AdminStore'
import { useLoginStore } from './stores/LoginStore'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'

const loginStore = useLoginStore()
loginStore.fetchUser()

const adminStore = useAdminStore()
adminStore.getSystems()

const route = useRoute()
const adminGalleryStore = useAdminGalleryStore()
const { isInAdminPanel } = storeToRefs(adminGalleryStore)

const currentRoute = computed(() => {
  return route.fullPath.includes('/admin-login') || route.fullPath.includes('/admin-panel')
    ? true
    : false
})

watch(
  () => route.fullPath,
  () => {
    if (route.fullPath === '/admin-panel/manage-gallery') {
      isInAdminPanel.value = true
    } else {
      isInAdminPanel.value = false
    }
  }
)
</script>
<template>
  <FadeTransition>
    <Navbar ref="navbar" v-if="!currentRoute" />
  </FadeTransition>
  <RouterView v-slot="{ Component }">
    <FadeTransition>
      <component :is="Component" />
    </FadeTransition>
  </RouterView>
  <FadeTransition>
    <FooTer v-if="!currentRoute" />
  </FadeTransition>
</template>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: $transition-04;
}
</style>
