<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

const activeFilters = ref({
  frontend: true,
  backend: true,
  career: true,
});
const isLoading = ref(false);

const store = useStore();

function setFilters(updatedFilters) {
  activeFilters.value = updatedFilters;
}

async function loadCoaches() {
  isLoading.value = true;
  await store.dispatch('coaches/loadCoaches');
  isLoading.value = false;
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
  return !isLoading.value && store.getters['coaches/hasCoaches'];
});

const isCoach = computed(() => {
  return store.getters['coaches/isCoach'];
});

onMounted(() => {
  loadCoaches();
});
</script>

<template>
  <section>
    <CoachFilter @change-filter="setFilters"></CoachFilter>
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline" @click="loadCoaches">Referesh</BaseButton>
        <BaseButton v-if="!isCoach && !isLoading" to="/register" link
          >Register as Coach</BaseButton
        >
      </div>
      <div v-if="isLoading">
        <BaseSpinner />
      </div>
      <ul v-else-if="hasCoaches">
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
