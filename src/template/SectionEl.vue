<script setup>
import ButtonEl from './ButtonEl.vue'
const props = defineProps({ link: String })
</script>

<template>
  <section class="section">
    <img class="section__img" :src="props.link" alt="" />
    <article class="section__description">
      <h2 class="section__heading">
        <slot name="heading"></slot>
      </h2>
      <p>
        <slot name="description"></slot>
      </p>
      <ButtonEl>
        <slot name="button"></slot>
      </ButtonEl>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.section {
  @include section-double-col;
  grid-template-rows: 400px 1fr;

  .section__img {
    @include img;
  }

  .section__description {
    @include description(2vw);

    .section__heading {
      @include heading-underline;
    }
  }
}
.reverse {
  background-color: $color-gray-lighter;
  @include breakpoint {
    grid-template-columns: 35% 1fr;
  }

  .section__img {
    @include breakpoint {
      order: 2;
    }
  }

  .section__description {
    @include breakpoint {
      order: 1;
    }
  }
}
</style>
