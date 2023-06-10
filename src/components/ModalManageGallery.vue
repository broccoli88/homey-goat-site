<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import ModalEl from '../template/ModalEl.vue'
import { useAdminGalleryStore } from '../stores/AdminGalleryStore'
import { storeToRefs } from 'pinia'

const adminGalleryStore = useAdminGalleryStore()
const { showModal, currentChange, newName } = storeToRefs(adminGalleryStore)
</script>

<template>
  <Teleport to="#admin-manage-gallery-modal">
    <section class="modal-container" v-if="showModal">
      <ModalEl>
        <template v-slot:heading>Change {{ currentChange }} Name </template>
        <template v-slot:description>
          <form class="form" @submit.prevent="">
            <div class="form__input-container">
              <label for="system">Add new system</label>
              <input
                type="text"
                id="system"
                name="system"
                placeholder="Enter new system name..."
                class="form__input"
                v-model.trim="newName.newName"
              />
              <p class="error">Error</p>
            </div>
            <ButtonEl class="form__btn btn--small btn--outline-black btn--slide-black"
              >Submit change</ButtonEl
            >
          </form>
        </template>
        <template v-slot:button>
          <ButtonEl
            @click="adminGalleryStore.closeModal"
            class="close__btn btn--small btn--outline-black btn--slide-black"
            >Close</ButtonEl
          >
        </template>
      </ModalEl>
    </section>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-container {
  @include modal-container;

  .form {
    display: grid;
    text-align: start;

    .form__input-container {
      margin-block: 2rem;
      display: grid;
      gap: 0.7rem;

      .form__input {
        @include form-input;
        order: initial;
      }

      .error {
        @include error;
      }
    }

    .form__btn {
      justify-self: self-start;
    }
  }

  .close__btn {
    justify-self: end;
  }
}
</style>
