<script setup>
import linksData from '../data/links.json'
import LogoEl from '../template/LogoEl.vue'
import FadeScaleIconTransition from '../utils/transitions/FadeScaleIconTransition.vue'
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const links = reactive(linksData.links)
const header = ref()
const navHeight = ref()
const route = useRoute()

// Current route

// Navbar toggle

const navUnwrapped = ref(false)
const toggleNav = () => {
  navUnwrapped.value = !navUnwrapped.value
}

watch(
  () => route.fullPath,
  () => {
    navUnwrapped.value = false
  }
)

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    navUnwrapped.value = false
  }
  navHeight.value = header.value.clientHeight
})

//  Intersection Observer
onMounted(() => {
  const watchedEl = document.createElement('div')
  header.value.before(watchedEl)

  const navObserver = new IntersectionObserver(
    (entries) => {
      header.value.classList.toggle('shrink', !entries[0].isIntersecting)
    },
    { rootMargin: '30px 0px 0px 0px' }
  )

  navObserver.observe(watchedEl)
})

//  Nav height

onMounted(() => {
  navHeight.value = header.value.clientHeight
})
</script>
<template>
  <header ref="header">
    <div class="nav-container" :class="navUnwrapped ? 'navToggled' : ''">
      <LogoEl class="logo" />
      <div class="menu" tabindex="0">
        <FadeScaleIconTransition name="fade" mode="out-in">
          <img v-if="!navUnwrapped" @click="toggleNav" src="/svg/open.svg" alt="" />
          <img v-else @click="toggleNav" src="/svg/close.svg" alt="" />
        </FadeScaleIconTransition>
      </div>
      <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item" v-for="(value, key) in links" :key="key">
            <router-link
              :to="value.path"
              class="nav__link"
              :class="value.path === route.fullPath ? 'active' : ''"
              >{{ value.name }}</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: white;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;

  .nav-container {
    @include container;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding-block: 1.5rem;

    transition: $transition-04;

    @include breakpoint {
      padding: 2rem;
    }

    .logo {
      margin-left: 1.5rem;
      @include breakpoint {
        margin-left: 0;
      }
    }

    .menu {
      width: 26px;
      height: 26px;
      margin-right: 1.5rem;

      cursor: pointer;

      @include breakpoint {
        display: none;
      }

      &:focus {
        outline: $outline-purple;
      }

      & > img {
        width: 100%;
        object-fit: cover;
      }
    }

    .nav {
      width: 100%;
      display: grid;
      grid-template-rows: 0fr;
      transition: $transition-04;

      @include breakpoint {
        width: auto;
        grid-template-rows: 1fr;
      }

      .navToggled {
        grid-template-rows: 1fr;
      }

      .nav__list {
        overflow: hidden;

        @include breakpoint {
          display: flex;
          gap: 2vw;
          // margin-right: 2rem;
        }

        .nav__item {
          &:first-child {
            margin-top: 2rem;

            @include breakpoint {
              margin-top: 0;
            }
          }

          .nav__link {
            display: block;
            padding: 0.4rem 2rem 0.1rem;
            position: relative;
            color: $color-font-light;
            text-transform: uppercase;
            isolation: isolate;
            transition: $transition-04;

            @include breakpoint {
              padding-inline: 0;
              font-weight: 700;
            }

            &:hover,
            &:focus {
              font-weight: 700;
              color: $color-white;
              outline: none;

              @include breakpoint {
                color: $color-black;
              }
            }

            &::before {
              content: '';
              background-color: $color-black;

              position: absolute;
              width: 0%;
              height: 100%;
              bottom: 0;
              left: 0;
              z-index: -1;

              transition: $transition-04;

              @include breakpoint {
                height: 3px;
              }
            }
            &:hover::before,
            &:focus::before {
              width: 100%;

              @include breakpoint {
                width: 30px;
                left: 50%;
                transform: translateX(-50%);
              }
            }
          }
          .active {
            color: $color-white;
            font-weight: 700;

            @include breakpoint {
              color: $color-black;
            }

            &::before {
              width: 100%;

              @include breakpoint {
                width: 30px;
                left: 50%;
                transform: translateX(-50%);
              }
            }
          }
        }
      }
    }
  }
  .navToggled {
    box-shadow: $box-shadow-5;
    .nav {
      grid-template-rows: 1fr;
    }
  }
}

.shrink {
  box-shadow: $box-shadow-5;
  .nav-container {
    padding-block: 0.4rem;

    @include breakpoint {
      padding-block: 0.6rem;
    }

    .menu {
      width: 20px;
      height: 20px;
      transition: $transition-04;
    }

    .nav__link {
      @include breakpoint {
        font-size: clamp(1rem, 1rem + 0.4vw, 1.7rem);
      }
    }
  }
}
</style>
