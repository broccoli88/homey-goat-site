<script setup>
import SectionEl from '../template/SectionEl.vue'
import { ref } from 'vue'

const imgLink = ref('/images/unit-cropped.webp')
const btnLink = ref('/gallery')
</script>
<template>
  <SectionEl :img-link="imgLink" :btn-link="btnLink">
    <template v-slot:heading>Gallery</template>
    <template v-slot:description>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, a minima temporibus
      perspiciatis quasi ut harum nulla, eos qui amet excepturi maxime illum, facere ea sit ab
      officiis libero dolor. Laborum adipisci consequatur, rem reprehenderit quidem eos ut sapiente
      fuga.
    </template>
    <template v-slot:button>Discover our work</template>
  </SectionEl>
</template>

<style lang="scss" scoped></style>
