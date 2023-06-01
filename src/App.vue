<script setup>
import FadeTransition from './utils/transitions/FadeTransition.vue'
import Navbar from './components/NavBar.vue'
import FooTer from './components/FooTer.vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const currentRoute = computed(() => {
  return route.fullPath.includes('/admin-login') || route.fullPath.includes('/admin-panel')
    ? true
    : false
})
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
