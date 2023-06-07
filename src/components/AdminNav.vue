<script setup>
import { ref } from 'vue'
import LogoEl from '../template/LogoEl.vue'
import FadeScaleIconTransition from '../utils/transitions/FadeScaleIconTransition.vue'

const showSubNav = ref(false)
const toggleSubNav = () => {
  showSubNav.value = !showSubNav.value
}
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
          <router-link to="/admin-panel/manage-gallery" class="nav__link">Add Img</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/admin-panel/add-img" class="nav__link">Manage Gallery</router-link>
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
    margin-top: 50%;

    .nav__list {
      display: grid;

      .nav__item {
        .nav__link {
          font-size: clamp(1.5rem, 0.8rem + 1.4vw, 2rem);
          font-weight: 700;
        }

        .nav__link {
          display: block;
          color: $color-gray-darker;
          text-transform: uppercase;
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

    .active {
      grid-template-rows: 1fr;
    }
  }
}
</style>
