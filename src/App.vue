<script setup>
import Navbar from './components/NavBar.vue'
import FooTer from './components/FooTer.vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <Navbar />
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
  <FooTer />
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
