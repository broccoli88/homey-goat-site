<script setup>
import LogoEl from '../template/LogoEl.vue'
</script>

<template>
  <aside class="nav">
    <LogoEl class="logo" />

    <nav class="nav__nav">
      <ul class="nav__list">
        <li class="nav__item">
          <router-link to="/admin-panel" class="nav__link">Main</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/admin-panel/gallery" class="nav__link">Gallery</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/admin-panel/blog" class="nav__link">Blog</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.nav {
  position: sticky;
  top: 0;

  display: grid;
  grid-template-rows: auto 1fr;

  height: 100dvh;
  padding-block: 4rem;
  background-color: $color-gray-lighter;
  box-shadow: $box-shadow-5;

  .logo {
    // filter: invert(1);
    padding-inline: 1.5rem;
  }
  .nav__nav {
    align-self: center;

    .nav__list {
      display: grid;
      gap: 2rem;

      .nav__item {
        .nav__link {
          display: block;
          color: $color-gray-darker;
          text-transform: uppercase;
          font-size: clamp(1.5rem, 0.8rem + 1.8vw, 2.4rem);
          font-weight: 700;
          padding: 0.7em 1.5em 0.5em;

          transition: $transition-04;

          &:hover,
          &:focus {
            background-color: $color-black;
            color: $color-white;
          }
        }
      }
    }
  }
}
</style>
