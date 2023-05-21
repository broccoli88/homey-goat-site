<script setup></script>

<template>
  <section class="banner" ref="banner">
    <h3 class="banner__fluff">homey goat</h3>
    <h1 class="banner__heading">about us</h1>
    <section class="banner__picture">
      <div class="banner__background"></div>
      <img src="/images/HB-clean.webp" alt="" class="banner__img" />
    </section>
  </section>
</template>

<style lang="scss" scoped>
.banner {
  display: grid;
  text-align: center;
  margin-top: clamp(10rem, 5rem + 15vw, 18rem);
  margin-bottom: 4rem;

  .banner__fluff {
    font-weight: 600;
  }

  .banner__heading {
    font-size: clamp(3.5rem, 1rem + 5vw, 6.5rem);
    @include heading-underline;
    margin-bottom: 3vw;
  }
  .banner__picture {
    height: clamp(15rem, 5rem + 25vw, 50rem);
    display: grid;
    align-items: center;
    justify-items: center;

    position: relative;

    .banner__background {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('/images/gray-concrete-wall.jpg');
      background-image: url('/images/bga.jpg');
      background-image: url('/images/bg.jpg');
      width: 100%;
      height: 70%;
    }

    .banner__img {
      height: 100%;
      object-fit: cover;

      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
