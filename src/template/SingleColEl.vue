<script setup>
import ButtonLinkEl from './ButtonLinkEl.vue'
import { computed } from 'vue'

const props = defineProps(['btnLink'])

const classCheck = computed(() => {
  return props.btnLink === '/contact' || props.btnLink === '/offer' ? true : false
})
</script>

<template>
  <section class="single-col__description">
    <h2 class="single-col__heading">
      <slot name="heading"></slot>
    </h2>
    <h3 class="single-col__fluff">
      <slot name="fluff"></slot>
    </h3>
    <p>
      <slot name="description"> </slot>
    </p>
    <ButtonLinkEl
      :btn-link="props.btnLink"
      class="btn--medium btn--gray btn--slide-black"
      :class="classCheck ? 'btn--white' : 'btn--gray'"
    >
      <slot name="button"></slot>
    </ButtonLinkEl>
  </section>
</template>

<style lang="scss" scoped>
.single-col__description {
  @include description;

  .single-col__heading {
    @include heading-underline-purple;
  }

  .single-col__fluff {
    @include breakpoint {
      margin-bottom: 1.5vw;
    }
  }

  p {
    margin-block: 2rem;
  }
}
// }
.single-col--alt {
  background-color: $color-gray-lighter;
  display: grid;
}
</style>
