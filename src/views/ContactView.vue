<script setup>
import BannerEl from '../template/BannerEl.vue'
import LogoEl from '../template/LogoEl.vue'
import QuestionForm from '../components/QuestionForm.vue'
import GetQuoteForm from '../components/GetQuoteForm.vue'
</script>
<template>
  <main>
    <BannerEl />

    <!-- <section class="description">
      <h2>
        Thanks for visiting our website, if you would like a quote or have a question, please
        complete all the information below as thoroughly as possible.
      </h2>
    </section> -->

    <!-- <section class="contact">
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
    </section> -->

    <section class="contact__forms">
      <div class="contact__forms-cards">
        <p class="contact__forms-card">Ask a question</p>
        <p class="contact__forms-card">Ask for a quote</p>
      </div>
      <div class="contact__forms-forms">
        <QuestionForm />
        <GetQuoteForm />
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
    margin-top: 3rem;

    .contact__logo {
      margin-inline: auto;
    }

    .contact__info {
      margin-block: 2rem;
    }
  }
  .contact__forms {
    width: min(60ch, 80%);
    margin-inline: auto;
    display: grid;
    gap: 2vw;

    .contact__forms-cards {
      font-size: clamp(1.3rem, 0.6rem + 1.2vw, 2.4rem);
      text-transform: uppercase;

      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      .contact__forms-card {
        @include heading-underline;
      }
    }
  }
}
</style>
