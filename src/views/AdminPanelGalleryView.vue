<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <section class="admin-gallery">
    <h2>Gallery</h2>

    <RouterView />
  </section>
</template>

<style lang="scss" scoped>
.admin-gallery {
  display: grid;
  margin: 4vw 2vw;
}
</style>
