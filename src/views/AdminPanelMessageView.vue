<script setup>
import MessagesEl from '../template/MessagesEl.vue'
import { useContactStore } from '../stores/ContactStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const contactStore = useContactStore()
const { messages } = storeToRefs(contactStore)

contactStore.getMessages()

const checkIfEmpty = computed(() => {
  return messages.value.length > 0
})

const newMessages = computed(() => {
  return messages.value.filter((message) => !message.checked)
})

const checkedMessages = computed(() => {
  return messages.value.filter((message) => message.checked)
})
</script>

<template>
  <div v-if="checkIfEmpty">
    <section class="admin-messages">
      <h3>New Messages</h3>
      <article v-if="newMessages.length > 0">
        <MessagesEl v-for="message in newMessages" :key="message.id" :message="message" />
      </article>
      <div v-else>
        <p>No New Messages...</p>
      </div>
    </section>
    <section class="admin-messages">
      <h3>Checked Messages</h3>
      <article v-if="checkedMessages.length > 0">
        <MessagesEl v-for="message in checkedMessages" :key="message.id" :message="message" />
      </article>
      <div v-else>
        <p>No Messages Left...</p>
      </div>
    </section>
  </div>
  <div class="empty" v-else>
    <h2>Empty...</h2>
  </div>
</template>

<style lang="scss" scoped>
.admin-messages {
  display: grid;
  margin: 6vw 2vw;

  h3 {
    margin-bottom: 3rem;
  }
}

.empty {
  display: grid;
  place-content: center;
  height: 50vh;
  margin: 4vw 2vw;
}
</style>
