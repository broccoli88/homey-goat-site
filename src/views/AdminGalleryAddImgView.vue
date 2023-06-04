<script setup>
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import ButtonEl from '../template/ButtonEl.vue'
import ModalAdminAddImg from '../components/ModalAdminAddImg.vue'
import { computed, reactive, ref } from 'vue'
import { useAdminStore } from '../stores/AdminStore'
import { storeToRefs } from 'pinia'

const adminStore = useAdminStore()
const { modelAssignement, systems, fractions, data } = storeToRefs(adminStore)

const doesExists = reactive({
  system: true,
  fraction: true
})

// Add System

const chooseFromExisistngSystem = () => {
  doesExists.system = !doesExists.system
}
const systemBtnOption = computed(() => {
  return !doesExists.system ? 'Existing System' : 'Add new system'
})

// Add Fracation

const chooseFromExisistngFraction = () => {
  doesExists.fraction = !doesExists.fraction
}
const fractionBtnOption = computed(() => {
  return !doesExists.fraction ? 'Existing Fraction' : 'Add new fraction'
})

// Get existing fractions and systems

const fileInput = ref()
// adminStore.getSystems()

const uploadData = async () => {
  await adminStore.uploadData(fileInput)

  //   adminStore.getSystems()
}
</script>

<template>
  <section class="container">
    <h3>Add Img</h3>
    <form action="" class="form" @submit.prevent="uploadData">
      <section class="form__section">
        <fieldset class="form__fieldset">
          <legend>Choose/Add System</legend>
          <span
            @click="chooseFromExisistngSystem"
            class="btn--small btn--outline-black btn--slide-black form__btn"
          >
            {{ systemBtnOption }}
          </span>
          <FadeTransition>
            <div v-if="doesExists.system" class="form__input-container">
              <label for="system">Choose system</label>
              <select
                id="system"
                name="system"
                class="form__input"
                v-model="modelAssignement.system"
              >
                <option disabled selected value>-- select an option --</option>
                <option :value="system" v-for="system in systems" :key="system">
                  {{ system }}
                </option>
              </select>
            </div>
            <div v-else class="form__input-container">
              <label for="system">Add new system</label>
              <input
                type="text"
                id="system"
                name="system"
                placeholder="Enter new system name..."
                class="form__input"
                v-model="modelAssignement.system"
              />
            </div>
          </FadeTransition>
          <span class="form__btn btn--small btn--outline-black btn--slide-black">Next</span>
        </fieldset>
      </section>
      <section class="form__section">
        <fieldset class="form__fieldset">
          <legend>Choose/Add Fraction</legend>
          <span
            @click="chooseFromExisistngFraction"
            class="form__btn btn--small btn--outline-black btn--slide-black"
          >
            {{ fractionBtnOption }}
          </span>
          <FadeTransition>
            <div v-if="doesExists.fraction" class="form__input-container">
              <select
                id="fraction"
                name="fraction"
                class="form__input"
                v-model="modelAssignement.fraction"
              >
                <option disabled selected value>-- select an option --</option>
                <!-- <optgroup :label="system.system" v-for="system in data" :key="system"> -->
                <option :value="fraction" v-for="fraction in fractions" :key="fraction">
                  {{ fraction }}
                </option>
                <!-- </optgroup> -->
              </select>
            </div>
            <div v-else class="form__input-container">
              <label for="fraction">Add new fraction</label>
              <input
                type="text"
                id="fraction"
                name="fraction"
                placeholder="Enter new fraction name..."
                class="form__input"
                v-model="modelAssignement.fraction"
              />
            </div>
          </FadeTransition>
          <span class="form__btn btn--small btn--outline-black btn--slide-black">Next</span>
        </fieldset>
      </section>
      <section class="form__section">
        <fieldset class="form__fieldset">
          <legend>Add Model</legend>
          <div class="form__input-container">
            <input
              type="text"
              id="model"
              name="model"
              placeholder="Enter models name..."
              class="form__input"
              v-model="modelAssignement.model"
            />
          </div>
          <div class="form__input-container">
            <input
              type="file"
              id="file"
              name="file"
              placeholder="Enter models name..."
              class="form__input"
              ref="fileInput"
            />
          </div>
        </fieldset>
      </section>
      <ButtonEl class="btn--medium btn--outline-black btn--slide-black">Submit</ButtonEl>
    </form>
  </section>
  <ModalAdminAddImg />
</template>

<style lang="scss" scoped>
.container {
  margin-block: 4vw;

  h3 {
    margin-bottom: 3rem;
  }

  .btns {
    display: flex;
    gap: 3rem;
    margin-bottom: 2rem;
  }

  .form {
    max-width: 70ch;
    display: grid;
    gap: 3vw;
  }

  .form__section {
    padding-bottom: 2rem;
    border-bottom: $bw-05 solid $bc-grayopacity-05;
  }

  .form__fieldset {
    padding: 2rem;
    border-radius: 7px;
    border: $bw-1 solid $bc-grayopacity-05;

    justify-content: stretch;

    .form__btn {
      line-height: 1.2;
      padding: 0.4em 1em 0.2em;
    }
  }

  .form__input-container {
    margin-block: 2rem;
    display: grid;
    gap: 0.7rem;

    .form__input {
      @include form-input;
      order: initial;
    }
  }
}
</style>
