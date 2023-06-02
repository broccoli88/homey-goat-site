<script setup>
const props = defineProps(['btnLink'])
</script>

<template>
  <a :href="props.btnLink">
    <slot />
  </a>
</template>

<style lang="scss"></style>
