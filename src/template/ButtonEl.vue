<script setup>
const props = defineProps(['btnLink'])
</script>

<template>
  <router-link :to="props.btnLink" class="btn">
    <slot> Check </slot>
  </router-link>
</template>

<style lang="scss">
.btn {
  @include btn--gray;
}
</style>
