<script setup>
import SectionEl from '../template/SectionEl.vue'
const link = 'public/images/US.webp'
</script>
<template>
  <SectionEl :link="link">
    <template v-slot:heading>Great Painters</template>
    <template v-slot:description>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, a minima temporibus
      perspiciatis quasi ut harum nulla, eos qui amet excepturi maxime illum, facere ea sit ab
      officiis libero dolor. Laborum adipisci consequatur, rem reprehenderit quidem eos ut sapiente
      fuga.
    </template>
    <template v-slot:button> See our team </template>
  </SectionEl>
</template>

<style lang="scss" scoped></style>
