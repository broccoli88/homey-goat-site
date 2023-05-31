<script setup>
import MessagesEl from '../template/MessagesEl.vue'
</script>

<template>
  <section class="admin-messages" v-if="true">
    <h2>Messages</h2>
    <MessagesEl />
  </section>
  <div class="empty" v-else>
    <h2>Empty...</h2>
  </div>
</template>

<style lang="scss" scoped>
.admin-messages {
  display: grid;
  margin: 4vw 2vw;
}

.empty {
  display: grid;
  place-content: center;
  height: 50vh;
  margin: 4vw 2vw;
}
</style>
