<script setup>
import LinksData from '../data/links.json'
import LogoEl from '../template/LogoEl.vue'
import { ref } from 'vue'

const links = ref(LinksData.links)
</script>

<template>
  <footer class="footer">
    <LogoEl />
    <section class="media">
      <router-link to="#" class="footer__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="white"
            d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z"
          />
        </svg>
      </router-link>
    </section>
    <ul class="footer__list">
      <li v-for="(value, key) in links" :key="key">
        <router-link :to="value" class="footer__link">{{ key }}</router-link>
      </li>
    </ul>
    <section class="maker">
      <p>Made by</p>
      <a href="https://paweljaromin.io/" class="maker__link">
        <img src="@svg/pj.svg" alt="" />
      </a>
    </section>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  @include container;
  height: min-content;
  display: grid;
  justify-items: center;
  gap: 1vw;

  padding: 1.5rem;
  margin-block: 2rem;
  @include breakpoint {
    padding: 2rem;
  }

  .media {
    .footer__icon {
      display: inline-flex;
      padding: 0.5rem;
      border-radius: 50%;
      background-color: $color-gray;
      cursor: pointer;
      transition: $transition-04;

      &:hover,
      &:focus {
        background-color: hsl(214, 89%, 52%);
        outline: none;
      }

      & > svg {
        width: clamp(15px, 0.5rem + 2vw, 24px);
        height: clamp(15px, 0.5rem + 2vw, 24px);
      }
    }
  }
  .footer__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1vw;

    .footer__link {
      font-size: clamp(1.1rem, 1rem + 0.3vw, 1.6rem);
      text-transform: uppercase;
      color: $color-font-light;
      padding: 0.2rem 0.3rem 0rem;
      transition: $transition-04;

      @include breakpoint {
        font-weight: 600;
      }

      &:hover,
      &:focus {
        color: $color-black;
        outline: none;
      }
    }
  }

  .maker {
    display: flex;
    align-items: center;
    gap: 0.6rem;

    & > p {
      font-size: clamp(1.1rem, 1rem + 0.3vw, 1.6rem);
      color: $color-purple;
    }
    .maker__link {
      &:focus {
        outline: $outline-purple;
      }

      & > img {
        vertical-align: middle;
        width: clamp(2rem, 1rem + 1vw, 2.5rem);
      }
    }
  }
}
</style>
