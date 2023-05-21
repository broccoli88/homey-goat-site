<script setup>
import ButtonLinkEl from './ButtonLinkEl.vue'

const props = defineProps(['btnLink'])
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
    <ButtonLinkEl :btn-link="props.btnLink">
      <slot name="button"></slot>
    </ButtonLinkEl>
  </section>
</template>

<style lang="scss" scoped>
.single-col__description {
  @include description;

  .single-col__heading {
    @include heading-underline;
  }

  .single-col__fluff {
    @include breakpoint {
      margin-bottom: 1.5vw;
    }
  }
}
// }
.single-col--alt {
  background-color: $color-gray-lighter;
  display: grid;
}
</style>
