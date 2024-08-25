<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import RequestItem from '../../components/requests/RequestItem.vue';

const store = useStore();

const isLoading = ref(false);
const error = ref(null);

async function loadRequsts() {
  isLoading.value = true;
  try {
    await store.dispatch('requests/fetchRequests');
  } catch (err) {
    error.value = err.message || 'Something failed!';
  }
  isLoading.value = false;
}

function closeDialog() {
  error.value = null;
}

const receivedRequsets = computed(() => {
  return store.getters['requests/requests'];
});

const hasRequests = computed(() => {
  return store.getters['requests/hasRequests'];
});

onMounted(() => {
  loadRequsts();
});
</script>

<template>
  <BaseDialog :show="!!error" title="An error occurred!" @close="closeDialog">
    <p>{{ error }}</p>
  </BaseDialog>
  <section>
    <BaseCard>
      <header>
        <h2>Requests Received</h2>
      </header>
      <BaseSpinner v-if="isLoading" />
      <ul v-else-if="hasRequests && !isLoading">
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
