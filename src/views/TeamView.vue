<script setup>
import teamMembers from '../data/team.json'
import BannerEl from '../template/BannerEl.vue'
import ButtonEl from '../template/ButtonEl.vue'
import CardEl from '../template/CardEl.vue'
import { reactive } from 'vue'

const team = reactive(teamMembers.team)
</script>

<template>
  <main>
    <BannerEl />
    <article class="description">
      <h2>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, dicta omnis. Excepturi
        ad quam assumenda!
      </h2>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet veritatis similique aperiam
        provident magni odit delectus laborum aliquid, velit labore.
      </h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nisi itaque sint alias
        voluptatum nobis est nulla ea, inventore cum amet, beatae, ratione atque rem. Exercitationem
        ullam labore aperiam sint animi molestiae doloribus fuga magni deserunt voluptas quasi, quod
        vitae qui sequi, eius a perspiciatis sit nihil expedita nemo totam enim! Excepturi, vel
        nesciunt minima impedit cupiditate reiciendis facilis eos?
      </p>
    </article>
    <section class="members">
      <CardEl v-for="member in team" :key="member" :member="member" />
    </section>
    <!-- <div class="bio-container">
      <article class="bio">
        <section class="bio__heading">
          <h2 class="bio__name">Koza</h2>
          <svg
            class="bio__close"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 256 256"
          >
            <path
              fill="black"
              d="M204.24 195.76a6 6 0 1 1-8.48 8.48L128 136.49l-67.76 67.75a6 6 0 0 1-8.48-8.48L119.51 128L51.76 60.24a6 6 0 0 1 8.48-8.48L128 119.51l67.76-67.75a6 6 0 0 1 8.48 8.48L136.49 128Z"
            />
          </svg>
        </section>
        <section class="bio__bio">
          <h3 class="bio__role">Smuggler</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur aut dolore laudantium
            deserunt obcaecati ipsam veritatis sunt fugit dolorum, illo earum, explicabo quod
            sapiente possimus voluptates at doloribus ut enim tempora perferendis. Rerum, reiciendis
            ipsam. Inventore nisi consequatur tempore nemo!
          </p>
        </section>
        <ButtonEl class="btn__bio btn--small btn--outline-black btn--slide-black">Close</ButtonEl>
      </article>
    </div> -->
  </main>
</template>

<style lang="scss" scoped>
main {
  @include container;

  .description {
    @include description($gap: 1vw, $width: 70ch);
  }

  .members {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(25rem, 100%), 1fr));
    margin-block: 3rem;
    padding: 1.5rem;
  }

  .bio {
    width: min(80rem, 100%);
    display: grid;
    grid-template-rows: auto 1fr auto;

    border: 0.5px solid black;
    border-radius: 5px;
    box-shadow: $box-shadow-5;
    background-color: white;

    padding: 2rem;
    margin-inline: auto;

    .bio__heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid $color-gray-lighter;
    }

    .bio__bio {
      margin-block: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .btn__bio {
      margin-left: auto;
    }
  }
}
</style>
