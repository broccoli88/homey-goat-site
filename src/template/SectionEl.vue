<script setup>
import ButtonLinkEl from './ButtonLinkEl.vue'
import { computed } from 'vue'

const props = defineProps(['imgLink', 'btnLink'])

const classCheck = computed(() => {
  return props.btnLink === '/contact' || props.btnLink === '/offer' ? true : false
})
</script>

<template>
  <section class="section">
    <img class="section__img" :src="props.imgLink" alt="" />
    <article class="section__description">
      <h2 class="section__heading">
        <slot name="heading"></slot>
      </h2>
      <p>
        <slot name="description"></slot>
      </p>
      <ButtonLinkEl
        :btn-link="props.btnLink"
        class="btn--medium btn--gray btn--slide-black"
        :class="classCheck ? 'btn--white' : 'btn--gray'"
      >
        <slot name="button"></slot>
      </ButtonLinkEl>
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
      @include heading-underline-purple;
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
