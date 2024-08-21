<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import RequestItem from '../../components/requests/RequestItem.vue';

const store = useStore();

const receivedRequsets = computed(() => {
  return store.getters['requests/requests'];
});

const hasRequests = computed(() => {
  return store.getters['requests/hasRequests'];
});
</script>

<template>
  <section>
    <BaseCard>
      <header>
        <h2>Requests Received</h2>
      </header>
      <ul v-if="hasRequests">
        <RequestItem
          v-for="request in receivedRequsets"
          :key="request.id"
          :email="request.userEmail"
          :message="request.message"
        />
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </BaseCard>
  </section>
</template>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
