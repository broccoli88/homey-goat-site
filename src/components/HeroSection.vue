<script setup>
import ButtonLinkEl from '../template/ButtonLinkEl.vue'
import { ref } from 'vue'

const btnLink = ref('/contact')
const btnLink2 = ref('/gallery')
</script>

<template>
  <section class="hero">
    <article class="hero__description">
      <h1 class="hero__heading">homey goat</h1>
      <h2 class="hero__heading-fluff">professional miniature painting studio</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nihil cumque sit porro quae
        dolore autem sapiente molestias repellendus ad, fugit quisquam suscipit optio inventore!
        Odit quisquam accusamus, repellat iure iusto esse laudantium dolorem voluptatum? Et
        voluptate ullam incidunt aperiam!
      </p>
      <div class="hero__btns">
        <ButtonLinkEl :btn-link="btnLink" class="btn--medium btn--gray btn--slide-black"
          >Ask for quote</ButtonLinkEl
        >
        <ButtonLinkEl :btn-link="btnLink2" class="btn--medium btn--gray btn--slide-black">
          Gallery
        </ButtonLinkEl>
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  @include section-single-col;

  place-items: center;

  color: $color-gray-lighter;

  background-image: url('/images/battle.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  position: relative;
  isolation: isolate;

  &::before {
    content: '';

    position: absolute;
    inset: 0;
    z-index: -1;
    opacity: 0.8;

    background-image: linear-gradient(
      135deg,
      hsl(0, 0%, 0%),
      hsl(0, 0%, 25%),
      hsl(0, 0%, 60%),
      transparent 96%
    );
  }

  .hero__description {
    @include description;

    .hero__heading,
    .hero__heading-fluff {
      color: $color-white;
    }

    .hero__heading-fluff {
      margin-bottom: 2.5vw;
    }

    .hero__btns {
      margin-top: 1.5rem;

      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 3vw;
    }
  }
}
</style>
