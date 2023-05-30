<script setup>
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { useGalleryStore } from '../stores/GalleryStore'
import { storeToRefs } from 'pinia'

const galleryStore = useGalleryStore()

const { showImgTransition, orderedCurrentFraction, transitionName } = storeToRefs(galleryStore)
</script>

<template>
  <Teleport to="#image-modal">
    <FadeTransition>
      <div class="modal-container" v-if="galleryStore.showModal">
        <TransitionGroup tag="ul" :name="transitionName" class="modal__miniatures">
          <li v-for="model in orderedCurrentFraction" :key="model.name">
            <img :src="model.img" alt="" @click="galleryStore.switchImg(model)" />
          </li>
        </TransitionGroup>
        <div class="modal__wrapper">
          <FadeTransition>
            <img
              v-if="showImgTransition"
              class="modal__image"
              :src="galleryStore.currentImg.img"
              alt=""
            />
            <img v-else class="modal__image" :src="galleryStore.currentImg.img" alt="" />
          </FadeTransition>
          <section class="modal__btns">
            <svg
              @click="galleryStore.moveLeft"
              class="chevron-left"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <g fill="white">
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
            <svg
              class="close-btn"
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              @click="galleryStore.toggleModal"
            >
              <path
                fill="none"
                stroke="white"
                stroke-linecap="round"
                stroke-width="1.5"
                d="m14.5 9.5l-5 5m0-5l5 5M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
              />
            </svg>
            <svg
              @click="galleryStore.moveRight"
              class="chevron-right"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <g fill="white">
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
          </section>
        </div>
      </div>
    </FadeTransition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  inset: 0;
  z-index: 999;

  background-color: $bs-c-black-09;
  display: grid;
  place-content: center;

  .modal__miniatures {
    display: none;

    @include breakpoint {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 7rem;
      justify-content: center;
      gap: 1rem;

      margin-bottom: 2rem;

      img {
        width: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }

  .modal__wrapper {
    height: fit-content;
    position: relative;
    display: grid;
    grid-template-columns: minmax(min(40rem, 100%), 90rem);

    .modal__image {
      @include img;
    }

    .modal__btns {
      display: flex;
      justify-content: center;
      gap: 6rem;

      margin-top: 1rem;

      .close-btn,
      .chevron-left,
      .chevron-right {
        cursor: pointer;
      }

      .chevron-left {
        transform: rotateZ(90deg);
      }

      .chevron-right {
        transform: rotateZ(-90deg);
      }

      .close-btn:active,
      .chevron-left:active,
      .chevron-right:active {
        @include scale-button;
      }
    }
  }
}

.left-enter-from,
.left-leave-to,
.right-leave-to,
.right-enter-from {
  opacity: 0;
}

.left-leave-to,
.right-enter-from {
  transform: translateX(100px);
}

.left-enter-from,
.right-leave-to {
  transform: translateX(-100px);
}

.left-move,
.right-move,
.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  transition: all 0.5s ease;
}
</style>
