<script setup>
import { defineProps, ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const props = defineProps(['id']);
const store = useStore();
const route = useRoute();

const selectedCoach = ref(null);

onBeforeMount(() => {
  selectedCoach.value = store.getters['coaches/coaches'].find(
    (coach) => coach.id === props.id
  );
});

const fullName = computed(() => {
  return selectedCoach.value.firstName + ' ' + selectedCoach.value.lastName;
});

const contactLink = computed(() => {
  return route.path + '/contact';
});

const rate = computed(() => {
  return selectedCoach.value.hourlyRate;
});

const areas = computed(() => {
  return selectedCoach.value.areas;
});
</script>

<template>
  <div>
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <BaseBadge
          v-for="area in areas"
          :key="area"
          :title="area"
          :type="area"
        ></BaseBadge>
        <p>{{ selectedCoach.description }}</p>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header>
          <h2>Interested? Reach out now!</h2>
          <BaseButton link :to="contactLink">Contact</BaseButton>
        </header>
        <RouterView></RouterView>
      </BaseCard>
    </section>
  </div>
</template>
