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
          <router-link to="/admin-panel/gallery" class="nav__link tree" @click="toggleSubNav">
            <p>Gallery</p>
            <FadeScaleIconTransition>
              <svg
                v-if="!showSubNav"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fill="black"
                    d="M9 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
                  />
                  <path
                    stroke="black"
                    stroke-linecap="round"
                    stroke-width="1.5"
                    d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
                  />
                </g>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-width="1.5"
                  d="m14.5 9.5l-5 5m0-5l5 5M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
                />
              </svg>
            </FadeScaleIconTransition>
          </router-link>

          <div class="nav__sub-wrapper" :class="{ active: showSubNav }">
            <ul class="nav__sub-list">
              <li class="nav__sub-item">
                <router-link to="/admin-panel/gallery" class="nav__sub-link"> Manage </router-link>
              </li>
              <li class="nav__sub-item">
                <router-link to="/admin-panel/gallery/add-img" class="nav__sub-link">
                  Add
                </router-link>
              </li>
            </ul>
          </div>
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
          font-size: clamp(1.5rem, 0.8rem + 1.8vw, 2.4rem);
          font-weight: 700;
        }

        .nav__sub-link,
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
        .tree {
          display: flex;
          justify-content: space-between;
          align-items: center;

          svg {
            path {
              transition: $transition-04;
            }
          }

          &:hover {
            svg {
              path {
                stroke: white;
              }
            }
          }
        }
      }

      .nav__sub-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        transition: $transition-04;

        .nav__sub-list {
          overflow: hidden;

          .nav__sub-item {
            .nav__sub-link {
              font-weight: 600;
              font-size: clamp(1.5rem, 0.8rem + 1.4vw, 1.8rem);
              margin-left: 20%;
            }
          }
        }
      }
      .active {
        grid-template-rows: 1fr;
      }
    }
  }
}
</style>
