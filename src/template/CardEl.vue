<script setup>
import ButtonEl from './ButtonEl.vue'
const props = defineProps(['member'])
</script>

<template>
  <section class="card">
    <img class="card__img" :src="props.member.img" alt="" />
    <section class="card__mini">
      <article class="card__mini-description">
        <h3 class="card__mini-person">{{ props.member.name }}</h3>
        <p class="card__mini-occupation">{{ props.member.role }}</p>
      </article>
      <ButtonEl class="card__mini-btn btn--small btn--outline-white btn--slide-white"
        >Read bio
      </ButtonEl>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.card {
  //   width: min(35rem, 100%);
  display: grid;
  position: relative;

  .card__img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;

    filter: grayscale(100%);
  }

  .card__mini {
    position: absolute;
    inset: 0;
    z-index: 1;

    display: grid;
    grid-auto-flow: column;
    align-content: end;

    padding: 1.5rem;
    background-color: hsl(0, 0%, 0%, 0.7);
    opacity: 0;

    cursor: pointer;
    transition: $transition-04;

    &:hover {
      opacity: 1;
    }

    .card__mini-description {
      .card__mini-person {
        color: $color-white;
      }

      .card__mini-occupation {
        color: $color-white;
      }
    }

    .card__mini-btn {
      margin-left: auto;
    }
  }
}
</style>
