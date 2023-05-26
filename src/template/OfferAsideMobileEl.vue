<script setup>
import { ref } from 'vue'
import pricesData from '../data/prices.json'
import PriceEl from '../template/PriceEl.vue'

const lvls = ref(pricesData.levels)
const prices = ref(pricesData.prices)
const sizes = ref(pricesData.sizes)

console.log(prices.value)
</script>

<template>
  <section class="mobile-aside">
    <div class="aside__heading">
      <h3>Painting</h3>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="black">
          <path
            d="m7.757 10.586l1.415-1.414L12 12l2.828-2.828l1.415 1.414L12 14.828l-4.243-4.242Z"
          />
          <path
            fill-rule="evenodd"
            d="M1 5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V5Zm4-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
            clip-rule="evenodd"
          />
        </g>
      </svg>
    </div>
    <article class="aside__description">
      <!-- <article class="aside__description-levels">
        <section v-for="lvl in lvls" :key="lvl" class="aside__descsription-lvl">
          <h3>{{ lvl.title }}</h3>
          <p>{{ lvl.text }}</p>
        </section>
      </article> -->
      <article class="aside__description-price-list">
        <section class="price-list__lvl-tags">
          <PriceEl v-for="lvl in lvls" :key="lvl" :data="lvl.title" class="price-list__lvl-tag" />
        </section>
        <section class="price-list__size-tags">
          <PriceEl v-for="size in sizes" :key="size" :data="size" class="price-list__size-tag">{{
            size
          }}</PriceEl>
        </section>
        <section class="price-list__price-tags">
          <section class="price-list__price-tags-size">
            <PriceEl
              v-for="price in prices.smallBase"
              :key="price"
              :data="price"
              class="price-list__price-tag"
              >{{ price }}</PriceEl
            >
          </section>
          <section class="price-list__price-tags-size">
            <PriceEl
              v-for="price in prices.mediumBase"
              :key="price"
              :data="price"
              class="price-list__price-tag"
              >{{ price }}</PriceEl
            >
          </section>
          <section class="price-list__price-tags-size">
            <PriceEl
              v-for="price in prices.LarageBase"
              :key="price"
              :data="price"
              class="price-list__price-tag"
              >{{ price }}</PriceEl
            >
          </section>
          <section class="price-list__price-tags-size">
            <PriceEl
              v-for="price in prices.hugeBase"
              :key="price"
              :data="price"
              class="price-list__price-tag"
              >{{ price }}</PriceEl
            >
          </section>
        </section>
      </article>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.mobile-aside {
  text-transform: uppercase;
  padding: 2rem;
  display: grid;

  .aside__heading {
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    padding: 0.8em 0 0.6em;

    h3 {
      color: $color-font-light;
    }

    svg {
      cursor: pointer;
    }
  }

  .aside__description {
    text-transform: none;
    padding: 1.5rem 1rem;

    .aside__description-levels {
      display: grid;
      gap: 2rem;
    }

    .aside__description-price-list {
      display: grid;
      grid-template-areas:
        'lvl lvl lvl lvl'
        'size price price price'
        'size price price price'
        'size price price price'
        'size price price price';

      .price-list__price-tags,
      .price-list__lvl-tags,
      .price-list__size-tags {
        display: grid;
      }

      .price-list__lvl-tags {
        grid-area: lvl;
        grid-auto-columns: 25%;
        grid-template-areas: '. tag-1 tag-2 tag-3';
        @for $i from 1 through 3 {
          .price-list__lvl-tag:nth-child(#{$i}) {
            grid-area: tag-#{$i};
          }
        }
      }

      .price-list__size-tags {
        grid-area: size;
      }

      .price-list__price-tags {
        grid-area: price;
      }
    }
  }
}
</style>
