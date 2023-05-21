<script setup>
import ButtonEl from './ButtonEl.vue'
</script>

<template>
  <section class="card">
    <div class="card__mini">
      <img class="card__img" src="/images/koza.jpg" alt="" />
      <ButtonEl>Read bio</ButtonEl>
    </div>
    <article class="description">
      <h2>Koza</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dicta nesciunt nostrum
        sequi recusandae iste nam ad veniam, cupiditate quisquam ut ratione nemo mollitia adipisci
        fugiat molestiae numquam officiis at!
      </p>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.card {
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 2rem;
  margin: 2rem;

  box-shadow: $box-shadow-5;

  .card__mini {
    display: grid;

    .card__img {
      width: min(30rem, 100%);
      aspect-ratio: 1;
      object-fit: cover;
    }
  }
}
</style>
