<script setup></script>

<template>
  <button class="btn--icon">
    <div class="btn--icon-content">
      <p>
        <slot name="text"></slot>
      </p>
      <slot name="icon"></slot>
    </div>
  </button>
</template>

<style lang="scss" scoped></style>

<style lang="scss">
.btn--icon {
  @include btn-icon;
}
.btn--icon-content {
  @include btn-icon-content;
}
</style>
