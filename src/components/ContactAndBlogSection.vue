<script setup>
import ButtonEl from '../template/ButtonEl.vue'
</script>

<template>
  <section class="cab">
    <article class="cab__description">
      <h2 class="cab__heading">Have Any questions ?</h2>
      <h3 class="cab__fluff">Contact us!</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia optio eligendi minima
        rerum cupiditate tenetur, officiis commodi reprehenderit, odit consectetur sapiente
        molestias error voluptatum incidunt sint. Magnam repellat eligendi qui iste sapiente, id
        voluptas, et obcaecati accusamus, debitis at nostrum!
      </p>
      <ButtonEl>Learn more</ButtonEl>
    </article>
    <article class="cab--alt">
      <section class="cab__description">
        <h2 class="cab__heading">Interested what's new ?</h2>
        <h3 class="cab__fluff">Check out our blog!</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia optio eligendi minima
          rerum cupiditate tenetur, officiis commodi reprehenderit, odit consectetur sapiente
          molestias error voluptatum incidunt sint. Magnam repellat eligendi qui iste sapiente, id
          voluptas, et obcaecati accusamus, debitis at nostrum!
        </p>
        <ButtonEl>Learn more</ButtonEl>
      </section>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.cab {
  @include section-single-col;
  grid-template-rows: repeat(2, 1fr);

  @include breakpoint {
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, 1fr);
  }

  .cab__description {
    @include description;

    .cab__heading {
      @include heading-underline;
    }

    .cab__fluff {
      @include breakpoint {
        margin-bottom: 1.5vw;
      }
    }
  }
}
.cab--alt {
  background-color: $color-gray-lighter;
  display: grid;
}
</style>
