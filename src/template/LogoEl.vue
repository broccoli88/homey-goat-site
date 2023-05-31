<script setup></script>
<template>
  <router-link to="/" class="logo">
    <img src="/svg/hg.svg" alt="" class="logo__img" />
    <div class="logo__text">
      <p class="logo__brand">homey goat</p>
      <p class="logo__fluff">Miniature painting studio</p>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.logo {
  @include logo;

  .logo__img {
    @include logo-img;
  }

  .logo__text {
    @include logo-text;

    .logo__brand {
      @include logo-brand;
    }

    .logo__fluff {
      @include logo-fluff;
    }
  }
}
.shrink {
  .logo {
    .logo__img {
      width: clamp(3rem, 1rem + 3vw, 5rem);
    }

    .logo__brand {
      font-size: clamp(1rem, 1rem + 0.7vw, 1.8rem);
    }

    .logo__fluff {
      font-size: clamp(0.7rem, 0.75vw, 1.1rem);
    }
  }
}
</style>
