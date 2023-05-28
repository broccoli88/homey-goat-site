<script setup>
import OfferAsideMobile from './OfferAsideMobile.vue'
import OfferPriceGridSection from './OfferPriceGridSection.vue'
</script>

<template>
  <aside class="offer__aside">
    <OfferAsideMobile>
      <template v-slot:section> Painting </template>
      <template v-slot:content>
        <OfferPriceGridSection />
      </template>
    </OfferAsideMobile>
    <OfferAsideMobile>
      <template v-slot:section> Assembly </template>
      <template v-slot:content>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, expedita illum
          consectetur, nisi quis dolor maxime error libero molestias vel cumque suscipit quia
          dignissimos. Magni, dolor id explicabo nostrum, dolorum animi consequatur in at ipsum
          reprehenderit magnam accusantium. Exercitationem laudantium accusamus aliquid labore quia
          necessitatibus, nam dolore excepturi, cum sequi suscipit illo cupiditate eaque repellendus
          distinctio vero at voluptatum culpa vitae facilis pariatur harum quo! Asperiores
          perferendis consectetur, unde earum officia ducimus mollitia consequuntur quas, quasi
          accusantium reprehenderit dignissimos dolorem ea quibusdam. Consectetur id ipsum nulla
          possimus recusandae impedit facilis, repellendus accusamus consequuntur rem saepe, est
          sunt, non odit numquam.
        </p>
      </template>
    </OfferAsideMobile>
    <OfferAsideMobile>
      <template v-slot:section> Basing </template>
      <template v-slot:content>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, expedita illum
          consectetur, nisi quis dolor maxime error libero molestias vel cumque suscipit quia
          dignissimos. Magni, dolor id explicabo nostrum, dolorum animi consequatur in at ipsum
          reprehenderit magnam accusantium. Exercitationem laudantium accusamus aliquid labore quia
          necessitatibus, nam dolore excepturi, cum sequi suscipit illo cupiditate eaque repellendus
          distinctio vero at voluptatum culpa vitae facilis pariatur harum quo! Asperiores
          perferendis consectetur, unde earum officia ducimus mollitia consequuntur quas, quasi
          accusantium reprehenderit dignissimos dolorem ea quibusdam. Consectetur id ipsum nulla
          possimus recusandae impedit facilis, repellendus accusamus consequuntur rem saepe, est
          sunt, non odit numquam.
        </p>
      </template>
    </OfferAsideMobile>
    <OfferAsideMobile>
      <template v-slot:section> Cleaning </template>
      <template v-slot:content>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, expedita illum
          consectetur, nisi quis dolor maxime error libero molestias vel cumque suscipit quia
          dignissimos. Magni, dolor id explicabo nostrum, dolorum animi consequatur in at ipsum
          reprehenderit magnam accusantium. Exercitationem laudantium accusamus aliquid labore quia
          necessitatibus, nam dolore excepturi, cum sequi suscipit illo cupiditate eaque repellendus
          distinctio vero at voluptatum culpa vitae facilis pariatur harum quo! Asperiores
          perferendis consectetur, unde earum officia ducimus mollitia consequuntur quas, quasi
          accusantium reprehenderit dignissimos dolorem ea quibusdam. Consectetur id ipsum nulla
          possimus recusandae impedit facilis, repellendus accusamus consequuntur rem saepe, est
          sunt, non odit numquam.
        </p>
      </template>
    </OfferAsideMobile>
  </aside>
</template>

<style lang="scss" scoped>
.offer__aside {
  width: 100%;
  max-width: 70ch;
  margin-inline: auto;

  text-align: left;

  display: grid;
  padding-inline: 1.5rem;
  // grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>
