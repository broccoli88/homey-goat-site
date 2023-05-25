<script setup></script>

<template>
  <Transition name="scale">
    <slot></slot>
  </Transition>
</template>

<style lang="scss" scoped>
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  -webkit-transform: scale(1.1);
  transform: translateY(-100px) scale(1.1);
}

.scale-enter-active,
.scale-leave-active {
  transition: $transition-04;
}
</style>
