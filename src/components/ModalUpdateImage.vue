<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import ModalEl from '../template/ModalEl.vue'
import { useAdminGalleryStore } from '../stores/AdminGalleryStore'
import { storeToRefs } from 'pinia'
import { ref } from 'firebase/storage'
import { onMounted } from 'vue'

const adminGalleryStore = useAdminGalleryStore()
const { showUpdateImageModal } = storeToRefs(adminGalleryStore)

const newImageRef = ref()
</script>

<template>
  <Teleport to="#admin-manage-update-image-modal">
    <section class="modal-container" v-if="showUpdateImageModal">
      <ModalEl>
        <template v-slot:heading>Update Image</template>
        <template v-slot:description>
          <div class="form__input-container">
            <label for="file">Upload new image:</label>
            <input
              ref="newImageRef"
              type="file"
              id="file"
              name="file"
              placeholder="Provide new image"
              class="form__input"
            />
          </div>
        </template>
        <template v-slot:button>
          <div class="btns">
            <ButtonEl
              @click="adminGalleryStore.submitUpdateImage(newImageRef)"
              class="form__btn btn--small btn--outline-black btn--slide-black"
              >Submit change</ButtonEl
            >
            <ButtonEl
              @click="adminGalleryStore.closeUpdateImageModal"
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
