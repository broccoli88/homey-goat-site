<script setup>
const props = defineProps(['btnLink'])
</script>

<template>
  <router-link :to="props.btnLink">
    <slot />
  </router-link>
</template>

<style lang="scss"></style>
