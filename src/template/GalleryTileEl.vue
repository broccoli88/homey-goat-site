<script setup>
const props = defineProps(['img'])
</script>

<template>
  <section class="miniature">
    <section class="miniature__tile">
      <img class="miniature__img" :src="props.img" alt="" />
      <div class="miniature__magnify">
        <img class="miniature__magnify-img" src="/svg/eye.svg" alt="" />
      </div>
    </section>
    <section class="miniature__description">
      <p class="miniature__name">
        <slot></slot>
      </p>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.miniature__tile {
  width: 100%;
  max-width: 30rem;
  color: $color-white;
  font-size: 1.5rem;

  position: relative;
  cursor: pointer;

  &:hover .miniature__magnify {
    opacity: 1;
  }

  .miniature__img {
    width: 100%;
    object-fit: cover;
    vertical-align: middle;
  }

  .miniature__magnify {
    background-color: hsl(0, 0%, 0%, 0.7);
    display: grid;
    justify-content: center;
    align-items: center;

    position: absolute;
    inset: 0;
    z-index: 1;

    opacity: 0;
    transition: $transition-03;

    .miniature__magnify-img {
      width: 78px;
    }
  }
}
.miniature__description {
  margin-top: 0.6rem;
  text-transform: capitalize;
}
</style>
