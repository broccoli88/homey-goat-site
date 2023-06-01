<script setup>
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import ButtonEl from '../template/ButtonEl.vue'
import { useContactStore } from '../stores/ContactStore'
import { storeToRefs } from 'pinia'

const contactStore = useContactStore()
const { showModal } = storeToRefs(contactStore)
</script>

<template>
  <Teleport to="#contact-modal">
    <FadeTransition>
      <section class="modal-container" v-if="showModal">
        <article class="contact-modal">
          <header class="modal__header">
            <h2 class="modal__heading">Message Submitted</h2>
          </header>
          <section class="modal__description">
            <p>We will contact you within 2 working days.</p>
            <p>Stay tuned!</p>
          </section>
          <ButtonEl
            @click="contactStore.closeModal"
            class="btn--small btn--outline-black btn--slide-black"
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

  .contact-modal {
    @include modal($min-width: 60rem);

    .modal__header {
      @include modal-header;
      gap: 5rem;
    }

    .modal__description {
      @include modal-description;
      text-align: center;
    }
  }
}
</style>
