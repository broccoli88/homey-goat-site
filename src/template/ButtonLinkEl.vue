<script setup>
import { computed } from 'vue'
const props = defineProps(['btnLink'])

const classCheck = computed(() => {
  return props.btnLink === '/contact' || props.btnLink === '/offer' ? true : false
})
</script>

<template>
  <router-link :to="props.btnLink" class="btn" :class="classCheck ? 'btn--white' : ''">
    <slot> Check </slot>
  </router-link>
</template>

<style lang="scss">
.btn {
  @include btn--gray;
}

.btn--white {
  @include btn--white;
}
</style>
