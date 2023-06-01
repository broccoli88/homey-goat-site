<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import ScaleSlideTransition from '../utils/transitions/ScaleSlideTransition.vue'
import { ref } from 'vue'
import { useMemberStore } from '../stores/MemberStore'
import { storeToRefs } from 'pinia'

const memberStore = useMemberStore()
const { member, showModal } = storeToRefs(memberStore)
const bio = ref()
</script>

<template>
  <Teleport to="#bio-modal">
    <ScaleSlideTransition>
      <section class="bio-container" ref="bio" v-if="showModal">
        <article class="bio">
          <section class="bio__header">
            <h2 class="bio__name">{{ member.name }}</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 256 256"
              @click="memberStore.toggleModal"
            >
              <path
                fill="black"
                d="M204.24 195.76a6 6 0 1 1-8.48 8.48L128 136.49l-67.76 67.75a6 6 0 0 1-8.48-8.48L119.51 128L51.76 60.24a6 6 0 0 1 8.48-8.48L128 119.51l67.76-67.75a6 6 0 0 1 8.48 8.48L136.49 128Z"
              />
            </svg>
          </section>
          <section class="bio__bio">
            <h3>{{ member.role }}</h3>
            <p class="bio__description">
              {{ member.bio }}
            </p>
          </section>
          <ButtonEl
            @click="memberStore.toggleModal"
            class="btn__bio btn--small btn--outline-black btn--slide-black"
            >Close</ButtonEl
          >
        </article>
      </section>
    </ScaleSlideTransition>
  </Teleport>
</template>

<style lang="scss" scoped>
.bio-container {
  @include modal-container;

  .bio {
    @include modal;

    .bio__header {
      @include modal-header;
    }

    .bio__bio {
      @include modal-description;
    }

    .btn__bio {
      margin-left: auto;
    }
  }
}
</style>
