<script setup>
import ButtonEl from '../template/ButtonEl.vue'
import LogoEl from '../template/LogoEl.vue'
import { useAdminStore } from '../stores/adminStore'
import { storeToRefs } from 'pinia'

const adminStore = useAdminStore()
const { v, adminState } = storeToRefs(adminStore)
</script>

<template>
  <main>
    <section class="login" ref="login">
      <LogoEl class="login__logo" />
      <h1 class="login__heading">Admin Login</h1>
      <article class="login__panel">
        <form class="login__form" @submit.prevent="adminStore.handleLogIn">
          <section class="login__section">
            <input
              v-model="adminState.username"
              @blur="v.username.$touch"
              class="login__input"
              placeholder="Username..."
              type="text"
              id="username"
            />
            <label for="username">Username</label>
            <p v-if="v.username.$error" class="error">{{ v.username.$errors[0].$message }}</p>
          </section>
          <section class="login__section">
            <input
              v-model="adminState.password.password"
              @blur="v.password.password.$touch"
              class="login__input"
              placeholder="Password..."
              type="password"
              id="password"
            />
            <label for="password">Password</label>
            <p v-if="v.password.password.$error" class="error">
              {{ v.password.password.$errors[0].$message }}
            </p>
          </section>
          <section class="login__section">
            <input
              v-model="adminState.password.confirmPassword"
              @blur="v.password.confirmPassword.$touch"
              class="login__input"
              placeholder="Repeat password..."
              type="password"
              id="repeat-password"
              ref="password"
            />
            <label for="repeat-password">Repeat password</label>
            <p v-if="v.password.confirmPassword.$error" class="error">
              {{ v.password.confirmPassword.$errors[0].$message }}
            </p>
          </section>
          <ButtonEl type="submit" class="form__btn btn--medium btn--outline-black btn--slide-black">
            Log In
          </ButtonEl>
        </form>
      </article>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.login {
  @include container;
  margin-bottom: 0;

  height: 100vh;
  display: grid;
  grid-auto-rows: min-content;
  align-content: center;

  .login__logo {
    justify-self: center;
  }

  .login__heading {
    text-align: center;
    margin-block: 1rem 4rem;
  }

  .login__panel {
    margin-inline: auto;
    width: min(60ch, 80%);

    .login__form {
      @include form;

      .login__section {
        @include form-section;

        .login__input {
          @include form-input;
        }
      }

      .form__btn {
        justify-self: auto;
        align-self: auto;
        margin-top: 3rem;
      }
    }
  }
}
</style>
