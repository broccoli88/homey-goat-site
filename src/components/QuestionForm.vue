<script setup>
import ButtonEl from '../template/ButtonEl.vue'
</script>

<template>
  <form class="form" @submit.prevent="handleForm">
    <section class="form__section">
      <input class="form__input" type="text" id="name" placeholder="Enter name..." />
      <label class="form__label" for="name">Name:</label>
    </section>

    <section class="form__section">
      <input class="form__input" type="text" id="last-name" placeholder="Enter last name..." />
      <label class="form__label" for="last-name">Last Name:</label>
    </section>

    <section class="form__section">
      <input class="form__input" type="email" id="email" placeholder="Enter email..." />
      <label class="form__label" for="email">Email address:</label>
    </section>

    <section class="form__section">
      <textarea
        class="form__input"
        type="text"
        id="message"
        placeholder="What is your question?"
        rows="10"
      />
      <label class="form__label" for="message">Message:</label>
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
}
</style>
