<script setup>
import BannerEl from '../template/BannerEl.vue'
import LogoEl from '../template/LogoEl.vue'
import QuestionForm from '../components/QuestionForm.vue'
import GetQuoteForm from '../components/GetQuoteForm.vue'
import FadeTransition from '../utils/transitions/FadeTransition.vue'
import { useContactStore } from '../stores/ContactStore'
import { storeToRefs } from 'pinia'

const contactStore = useContactStore()
const { questionForm } = storeToRefs(contactStore)
</script>
<template>
  <main>
    <BannerEl />

    <section class="description">
      <h2>
        Thanks for visiting our website, if you would like a quote or have a question, please
        complete all the information below as thoroughly as possible.
      </h2>
    </section>

    <section class="contact">
      <LogoEl class="contact__logo" />
      <article class="contact__info">
        <p>Kozia 2 / szafa do Narnii</p>
        <p>43-000 Czechowice-Dziedzice</p>
        <p>Poland</p>
      </article>
      <article class="contact__contact">
        <p>+48 000 000 000</p>
        <p>koza-to-pala@zdecydowanie.com</p>
      </article>
    </section>

    <section class="contact__form">
      <div class="contact__form-cards">
        <div
          class="contact__form-card card-underline-left"
          :class="questionForm ? 'card-left-active' : ''"
          @click="contactStore.switchToQuestionForm"
        >
          <p class="">Ask a question</p>
        </div>
        <div
          class="contact__form-card card-underline-right"
          :class="!questionForm ? 'card-right-active' : ''"
          @click="contactStore.switchToQuoteForm"
        >
          <p class="">Ask for a quote</p>
        </div>
      </div>
      <div class="contact__form-forms">
        <FadeTransition>
          <keep-alive>
            <component :is="questionForm ? QuestionForm : GetQuoteForm" />
          </keep-alive>
        </FadeTransition>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  @include container;

  .description {
    @include description($gap: 1vw, $width: 70ch);
  }

  .contact {
    @include description($gap: 1vw, $width: 70ch);
    margin-block: 6rem;

    @include breakpoint {
      margin-block: 6vw;
    }

    .contact__logo {
      margin-inline: auto;
    }

    .contact__info {
      margin-block: 2rem;
    }
  }
  .contact__form {
    width: min(60ch, 80%);
    margin-inline: auto;
    display: grid;
    gap: 2vw;

    .contact__form-cards {
      font-size: clamp(1.3rem, 0.6rem + 1.2vw, 2.4rem);
      text-transform: uppercase;

      display: grid;
      grid-auto-flow: column;
      align-items: center;
      transition: 0;

      .contact__form-card {
        display: grid;
        justify-content: center;
        cursor: pointer;

        &:first-child {
          border-right: $bw-05 solid $bc-grayopacity-05;
        }
      }
    }

    .card-underline-left,
    .card-underline-right {
      position: relative;
      transition: $transition-04;

      &::before {
        content: '';
        background-color: $color-black;

        position: absolute;
        bottom: -5px;
        width: min(30%, 10rem);
        height: 1px;
        opacity: 0;

        transform: translateX(0);
        transition: $transition-04;
      }
    }

    .card-underline-right {
      &::before {
        right: 20%;
      }
    }

    .card-underline-left {
      &::before {
        left: 20%;
      }
    }

    .card-right-active,
    .card-left-active {
      color: black;

      &::before {
        opacity: 1;
        transform: translateX(-50%);
      }
    }

    .card-left-active,
    .card-right-active {
      &::before {
        left: 50%;
      }
    }
  }
}
</style>
