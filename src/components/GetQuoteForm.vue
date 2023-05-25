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
      <input class="form__input" type="text" id="country" placeholder="Enter country..." />
      <label class="form__label" for="country">Country:</label>
    </section>

    <section class="form__section form__section-select">
      <div class="select-wrapper">
        <select id="supply" class="form__select">
          <option value="Shop" selected>Shop Supply</option>
          <option value="Customer">Client Supply</option>
        </select>
        <label class="form__select-label" for="supply">How are you supplying us with models?</label>
      </div>
    </section>

    <section class="form__checkboxes">
      <p class="form__checkboxes-heading">We offer:</p>
      <div class="form__checkbox">
        <input class="checkbox" type="checkbox" name="assemble" id="assemble" />
        <label class="form__label" for="assemble">Assemble</label>
      </div>
      <div class="form__checkbox">
        <input type="checkbox" name="basing" id="basing" />
        <label class="form__label" for="basing">Basing</label>
      </div>
      <div class="form__checkbox">
        <input type="checkbox" name="painting" id="painting" />
        <label class="form__label" for="painting">Painting</label>
      </div>
      <div class="form__checkbox">
        <input type="checkbox" name="cleaning" id="cleaning" />
        <label class="form__label" for="cleaning">Cleaning</label>
      </div>
    </section>

    <section class="form__section">
      <textarea class="form__input" type="text" id="message" placeholder="Message" rows="10" />
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

  .select-wrapper {
    width: 100%;
    max-width: 70ch;
    position: relative;
    display: grid;
    align-items: center;
    grid-template-areas:
      'label'
      'select';

    &::after {
      content: '';
      width: 0.8em;
      height: 0.5em;
      background-color: $color-gray;
      clip-path: polygon(100% 0%, 0 0%, 50% 100%);
      justify-self: end;
      margin-right: 2rem;
    }

    &:after,
    .form__select {
      grid-area: select;
    }

    &.form__select:focus &::after {
      background-color: black;
    }

    .form__select {
      @include form-input;
      width: 100%;
      max-width: 70ch;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-color: transparent;
      display: grid;
      grid-template-areas: 'select';
    }

    .form__select-label {
      grid-area: label;
    }
  }

  .form__checkboxes {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    & > label {
      transition: $transition-02;
    }

    .form__checkboxes-heading {
      grid-column: 1 / -1;
      margin-bottom: 1rem;
    }

    .form__checkbox {
      input[type='checkbox'] {
        appearance: none;
        border: 1px solid $color-gray;
        padding: 0.4em;
        margin-right: 0.8em;
        transition: $transition-02;
      }

      input[type='checkbox']:focus {
        border: 1px solid $color-black;
        outline: none;
      }

      input[type='checkbox']:checked {
        border: 1px solid $color-black;
        box-shadow: inset 0 0 0 1px $color-white;
        background-color: $color-black;
      }

      input[type='checkbox']:checked + label,
      input[type='checkbox']:focus + label {
        color: $color-black;
      }
    }
  }
}
</style>
