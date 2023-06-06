<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { ref } from 'vue'
import { useMemberStore } from '../stores/MemberStore'
import { storeToRefs } from 'pinia'

const memberStore = useMemberStore()
const { member, showModal } = storeToRefs(memberStore)
const bio = ref()
</script>

<template>
  <Teleport to="#bio-modal">
    <FadeTransition>
      <section class="modal-container" ref="bio" v-if="showModal">
        <article class="modal">
          <section class="modal__header">
            <h2 class="modal__name">{{ member.name }}</h2>
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
          <section class="modal__bio">
            <h3>{{ member.role }}</h3>
            <p class="modal__description">
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
    </FadeTransition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-container {
  @include modal-container;

  .modal {
    @include modal;

    .modal__header {
      @include modal-header;
    }

    .modal__bio {
      @include modal-description;
    }

    .btn__bio {
      margin-left: auto;
    }
  }
}
</style>
