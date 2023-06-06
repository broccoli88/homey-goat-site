<script setup>
import ButtonLinkEl from './ButtonLinkEl.vue'
import { computed, ref } from 'vue'

const props = defineProps(['imgLink', 'btnLink'])
const img = ref(props.imgLink)

const classCheck = computed(() => {
  return props.btnLink === '/contact' || props.btnLink === '/offer' ? true : false
})
</script>

<template>
  <section class="section">
    <img class="section__img" :data-src="img" :src="img" alt="" />
    <article class="section__description">
      <h2 class="section__heading">
        <slot name="heading"></slot>
      </h2>
      <p><slot name="description"></slot></p>
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
  grid-template-rows: 350px 1fr;

  .section__img {
    @include img;
  }

  .section__description {
    @include description(2vw);

    .section__heading {
      @include heading-underline-purple;
    }

    p {
      margin-block: 2rem;
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
