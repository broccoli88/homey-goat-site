<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <section class="admin-gallery">
    <h2>Gallery</h2>
    <img src="https://mega.nz/file/DN0VnBoT#n5rg7dOpxmBTVvkCmcEMX70GEws16o09WNbeLPqUP4g" alt="" />

    <RouterView />
  </section>
</template>

<style lang="scss" scoped>
.admin-gallery {
  display: grid;
  margin: 4vw 2vw;
}
</style>
