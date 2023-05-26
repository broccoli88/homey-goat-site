<script setup>
import OfferAsideMobileEl from '../template/OfferAsideMobileEl.vue'
</script>

<template>
  <section class="mobile-offer">
    <aside class="offer__aside">
      <OfferAsideMobileEl />
      <!-- <OfferAsideMobileEl />
      <OfferAsideMobileEl /> -->
    </aside>
    <article class="offer__aside-description"></article>
  </section>
</template>

<style lang="scss" scoped>
.mobile-offer {
  display: grid;

  .offer__aside {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

    // justify-items: center;
    // align-items: center;
  }
}
</style>
