<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'
import { reactive } from 'vue'

const state = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: ''
})

const rules = {
  firstName: { required, minLength: minLength(3), maxLength: maxLength(15), $autoDirty: true },
  lastName: { required, minLength: minLength(3), maxLength: maxLength(15), $autoDirty: true },
  email: { required, email, maxLength: maxLength(40), $autoDirty: true },
  message: { required, minLength: minLength(3), maxLength: maxLength(1000), $autoDirty: true }
}

const v = useVuelidate(rules, state)

const handleForm = async () => {
  const isFormCorrect = await v.value.$validate()

  if (!isFormCorrect) return
}
</script>

<template>
  <form class="form" @submit.prevent="handleForm">
    <section class="form__section">
      <input
        class="form__input"
        type="text"
        id="name"
        placeholder="Enter name..."
        v-model.lazy="state.firstName"
        @blur="v.firstName.$touch"
      />
      <label class="form__label" for="name">First Name:</label>
      <p class="error" v-if="v.firstName.$error">{{ v.firstName.$errors[0].$message }}</p>
    </section>

    <section class="form__section">
      <input
        class="form__input"
        type="text"
        id="last-name"
        placeholder="Enter last name..."
        v-model.lazy="state.lastName"
        @blur="v.lastName.$touch"
      />
      <label class="form__label" for="last-name">Last Name:</label>
      <p class="error" v-if="v.lastName.$error">{{ v.lastName.$errors[0].$message }}</p>
    </section>

    <section class="form__section">
      <input
        class="form__input"
        type="text"
        id="email"
        placeholder="Enter email..."
        v-model.lazy="state.email"
        @blur="v.email.$touch"
      />
      <label class="form__label" for="email">Email address:</label>
      <p class="error" v-if="v.email.$error">{{ v.email.$errors[0].$message }}</p>
    </section>

    <section class="form__section">
      <textarea
        class="form__input resize"
        type="text"
        id="message"
        placeholder="What is your question?"
        rows="10"
        v-model.lazy="state.message"
        @blur="v.message.$touch"
      />
      <label class="form__label" for="message">Message:</label>
      <p class="error" v-if="v.message.$error">{{ v.message.$errors[0].$message }}</p>
    </section>
    <ButtonEl class="form__btn btn--medium btn--outline-black btn--slide-black">Submit</ButtonEl>
  </form>
</template>

<style lang="scss" scoped>
.form {
  @include form;

  .form__section {
    @include form-section;

    .form__input {
      @include form-input;
    }
  }

  .form__btn {
    justify-self: auto;
    align-self: auto;
  }

  .resize {
    resize: vertical;
  }
}
</style>
