<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import ModalEl from '../template/ModalEl.vue'
import { useAdminGalleryStore } from '../stores/AdminGalleryStore'
import { storeToRefs } from 'pinia'

const adminGalleryStore = useAdminGalleryStore()
const { showRenameModal, elementToRename, newName } = storeToRefs(adminGalleryStore)
</script>

<template>
  <Teleport to="#admin-manage-rename-modal">
    <section class="modal-container" v-if="showRenameModal">
      <ModalEl>
        <template v-slot:heading>Change {{ elementToRename }} Name </template>
        <template v-slot:description>
          <!-- <form class="form" @submit.prevent=""> -->
          <div class="form__input-container">
            <label for="system">Enter new {{ elementToRename }} name:</label>
            <input
              type="text"
              id="system"
              name="system"
              placeholder="Enter new system name..."
              class="form__input"
              v-model.trim="newName"
            />
          </div>
          <!-- </form> -->
        </template>
        <template v-slot:button>
          <div class="btns">
            <ButtonEl
              @click="adminGalleryStore.submitRename"
              class="form__btn btn--small btn--outline-black btn--slide-black"
              >Submit change</ButtonEl
            >
            <ButtonEl
              @click="adminGalleryStore.closeRenameModal"
              class="close__btn btn--small btn--outline-black btn--slide-black"
              >Close</ButtonEl
            >
          </div>
        </template>
      </ModalEl>
    </section>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-container {
  @include modal-container;

  .form__input-container {
    margin-block: 2rem;
    display: grid;
    gap: 0.7rem;
    text-align: left;

    .form__input {
      @include form-input;
      order: initial;
    }

    .error {
      @include error;
    }
  }
}
.btns {
  display: flex;
  gap: 1.5rem;
  margin-inline: auto;
}
</style>
