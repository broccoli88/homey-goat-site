<script setup>
import ButtonEl from './ButtonEl.vue'
const props = defineProps(['btnLink'])
</script>

<template>
  <ButtonEl>
    <router-link :to="props.btnLink">
      <slot />
    </router-link>
  </ButtonEl>
</template>

<style lang="scss"></style>
