<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const filteredCoaches = computed(() => {
  return store.getters['coaches/coaches'];
});

const hasCoaches = computed(() => {
  return store.getters['coaches/hasCoaches'];
});
</script>

<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Referesh</button>
      <RouterLink to="/register">Register as Coach</RouterLink>
    </div>
    <ul v-if="hasCoaches">
      <li v-for="coach in filteredCoaches" :key="coach.id">
        {{ coach.firstName }}
      </li>
    </ul>
    <h3 v-else>No coaches Found!</h3>
  </section>
</template>
