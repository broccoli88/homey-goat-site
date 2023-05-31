<script setup>
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
  <Navbar ref="navbar" v-if="!currentRoute" />
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
  <FooTer v-if="!currentRoute" />
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
