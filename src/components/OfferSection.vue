<script setup>
import SectionEl from '../template/SectionEl.vue'
import { ref } from 'vue'

const imgLink = ref('public/images/th-cropped.webp')
const btnLink = ref('/offer')
</script>

<template>
  <SectionEl :img-link="imgLink" :btn-link="btnLink" class="reverse">
    <template v-slot:heading>Painting, modeling, basing</template>
    <template v-slot:description>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, a minima temporibus
      perspiciatis quasi ut harum nulla, eos qui amet excepturi maxime illum, facere ea sit ab
      officiis libero dolor. Laborum adipisci consequatur, rem reprehenderit quidem eos ut sapiente
      fuga.
    </template>
    <template v-slot:button> Prices & Levels </template>
  </SectionEl>
</template>

<style lang="scss" scoped></style>
