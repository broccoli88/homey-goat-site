<script setup></script>

<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  @include btn;
}
</style>
