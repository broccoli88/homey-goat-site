<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import { ref } from 'vue'

const props = defineProps({
  showModal: Boolean
})
const emits = defineEmits(['emitToggleModal'])
const bio = ref()

const emitToggleModal = () => {
  emits('emitToggleModal')
}
</script>

<template>
  <Teleport to="#bio-modal">
    <Transition name="modal">
      <section class="bio-container" ref="bio" v-if="props.showModal">
        <article class="bio">
          <section class="bio__heading">
            <h2 class="bio__name">Koza</h2>
            <svg
              class="bio__close"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 256 256"
              @click="emitToggleModal"
            >
              <path
                fill="black"
                d="M204.24 195.76a6 6 0 1 1-8.48 8.48L128 136.49l-67.76 67.75a6 6 0 0 1-8.48-8.48L119.51 128L51.76 60.24a6 6 0 0 1 8.48-8.48L128 119.51l67.76-67.75a6 6 0 0 1 8.48 8.48L136.49 128Z"
              />
            </svg>
          </section>
          <section class="bio__bio">
            <h3 class="bio__role">Smuggler</h3>
            <p class="bio__description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur aut dolore
              laudantium deserunt obcaecati ipsam veritatis sunt fugit dolorum, illo earum,
              explicabo quod sapiente possimus voluptates at doloribus ut enim tempora perferendis.
              Rerum, reiciendis ipsam. Inventore nisi consequatur tempore nemo!
            </p>
          </section>
          <ButtonEl
            @click="emitToggleModal"
            class="btn__bio btn--small btn--outline-black btn--slide-black"
            >Close</ButtonEl
          >
        </article>
      </section>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.bio-container {
  position: fixed;
  inset: 0;
  z-index: 99;
  margin-inline: 1.5rem;

  display: grid;
  place-content: center;

  background-color: hsl(0, 0%, 100%, 0.6);
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

      .bio__close {
        cursor: pointer;
      }
    }

    .bio__bio {
      margin-block: 2rem;
      padding-bottom: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      border-bottom: 1px solid $color-gray-lighter;

      .bio__description {
        font-size: clamp(1.5rem, 1rem + 0.7vw, 2.2rem);
      }
    }

    .btn__bio {
      margin-left: auto;
    }
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  -webkit-transform: scale(1.1);
  transform: translateY(-100px) scale(1.1);
}

.modal-enter-active,
.modal-leave-active {
  transition: $transition-04;
}
</style>
