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
const error = ref(null);
const showDialog = ref(false);

const store = useStore();

function setFilters(updatedFilters) {
  activeFilters.value = updatedFilters;
}

async function loadCoaches(refresh = false) {
  isLoading.value = true;
  try {
    await store.dispatch('coaches/loadCoaches', { forceRefresh: refresh });
  } catch (err) {
    error.value = err.message || 'Something went wrong!';
    showDialog.value = true;
  }
  isLoading.value = false;
}

function closeDialog() {
  // showDialog.value = false;
  error.value = false;
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
  <div>
    <!-- My way to showing BaseDialog component, that requires to an v-if statement and also defining a new ref called 'showDialog', the problem is if we use this way the Transition component does not work on BaseDialog component so animations does not apply to the component, the reason i think is related to "show" prop because in this way we set it always to true-->
    <!-- <BaseDialog
      v-if="error && !isLoading && showDialog"
      show
      title="An error occurred!"
      @close="closeDialog"
    >
      <p>{{ error }}</p>
    </BaseDialog> -->

    <!-- Max way to showing BaseDialog component that is shorter and cleaner than mine because we do not want v-if or showDialog ref -->
    <BaseDialog :show="!!error" title="An error occurred!" @close="closeDialog">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <CoachFilter @change-filter="setFilters"></CoachFilter>
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadCoaches(true)"
            >Referesh</BaseButton
          >
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
  </div>
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
