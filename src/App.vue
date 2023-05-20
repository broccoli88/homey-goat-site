<script setup>
import Navbar from './components/NavBar.vue'
import FooTer from './components/FooTer.vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <Navbar />
  <RouterView />
  <FooTer />
</template>

<style lang="scss" scoped></style>
