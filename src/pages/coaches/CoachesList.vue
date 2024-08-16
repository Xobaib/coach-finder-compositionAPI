<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import CoachItem from '../../components/coaches/CoachItem.vue';

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
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline">Referesh</BaseButton>
        <BaseButton to="/register" link>Register as Coach</BaseButton>
      </div>
      <ul v-if="hasCoaches">
        <CoachItem
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        />
      </ul>
      <h3 v-else>No coaches Found!</h3>
    </BaseCard>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;

  justify-content: space-between;
}
</style>
