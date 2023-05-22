<script setup></script>

<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style lang="scss">
.btn--outline-white {
  @include btn--outline-white;
}

// Sizes

.btn--small {
  @include btn--small;
}

.btn--medium {
  @include btn--medium;
}

.btn--large {
  @include btn--large;
}

// Styles

.btn--gray {
  @include btn--gray;
}

.btn--white {
  @include btn--white;
}

.btn--black {
  @include btn--black;
}

.btn--outline-white {
  @include btn--outline-white;
}

.btn--outline-black {
  @include btn--outline-black;
}

// Effects

.btn--slide-black {
  @include btn--slide-black;
}

.btn--slide-white {
  @include btn--slide-white;
}
</style>
