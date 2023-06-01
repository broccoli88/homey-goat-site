<script setup>
import MessagesEl from '../template/MessagesEl.vue'
import { useAdminStore } from '../stores/AdminStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

const adminStore = useAdminStore()
const { messages } = storeToRefs(adminStore)

adminStore.getMessages()

// onMounted(async () => {
//   await adminStore.getMessages()
//  })

const checkIfEmpty = computed(() => {
  return messages.value.length > 0
})
</script>

<template>
  <section class="admin-messages" v-if="checkIfEmpty">
    <h2>Messages:</h2>
    <article>
      <MessagesEl v-for="message in messages" :key="message.id" :message="message" />
    </article>
  </section>
  <div class="empty" v-else>
    <h2>Empty...</h2>
  </div>
</template>

<style lang="scss" scoped>
.admin-messages {
  display: grid;
  margin: 4vw 2vw;

  h2 {
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
