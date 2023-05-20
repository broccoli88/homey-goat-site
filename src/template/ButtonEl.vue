<script setup></script>

<template>
  <router-link to="#" class="btn">
    <slot> Check </slot>
  </router-link>
</template>

<style lang="scss">
.btn {
  @include btn--gray;
}
</style>
