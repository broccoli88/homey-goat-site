<script setup>
const props = defineProps(['data'])
</script>

<template>
  <section class="price-list-section">
    <p class="section__text">{{ props.data }}</p>
  </section>
</template>

<style lang="scss" scoped>
.price-list-section {
  font-weight: 600;
  color: $color-black;
  display: grid;
  text-align: center;
}
</style>
