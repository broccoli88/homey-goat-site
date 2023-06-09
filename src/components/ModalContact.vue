<script setup>
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import ModalEl from '../template/ModalEl.vue'
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
        <ModalEl class="contact-modal">
          <template v-slot:heading>Message Submitted</template>
          <template v-slot:description>
            <p>We will contact you within 2 working days.</p>
            <p>Stay tuned!</p>
          </template>
          <template v-slot:button>
            <ButtonEl
              @click="contactStore.closeModal"
              class="btn-close btn--small btn--outline-black btn--slide-black"
            >
              Close
            </ButtonEl>
          </template>
        </ModalEl>
      </section>
    </FadeTransition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-container {
  @include modal-container;

  .btn-close {
    justify-self: end;
  }
}
</style>
