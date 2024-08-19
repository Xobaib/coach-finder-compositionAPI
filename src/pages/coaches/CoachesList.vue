<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

const activeFilters = ref({
  frontend: true,
  backend: true,
  career: true,
});

const store = useStore();

function setFilters(updatedFilters) {
  activeFilters.value = updatedFilters;
}

const filteredCoaches = computed(() => {
  const coaches = store.getters['coaches/coaches'];
  return coaches.filter((coach) => {
    if (activeFilters.value.frontend && coach.areas.includes('frontend')) {
      return true;
    }
    if (activeFilters.value.backend && coach.areas.includes('backend')) {
      return true;
    }
    if (activeFilters.value.career && coach.areas.includes('career')) {
      return true;
    }
    return false;
  });
});

const hasCoaches = computed(() => {
  return store.getters['coaches/hasCoaches'];
});

const isCoach = computed(() => {
  return store.getters['coaches/isCoach'];
});
</script>

<template>
  <section>
    <CoachFilter @change-filter="setFilters"></CoachFilter>
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline">Referesh</BaseButton>
        <BaseButton v-if="!isCoach" to="/register" link
          >Register as Coach</BaseButton
        >
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
