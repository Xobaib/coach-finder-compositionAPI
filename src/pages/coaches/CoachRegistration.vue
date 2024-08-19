<script setup>
import { useStore } from 'vuex';
import CoachForm from '../../components/coaches/CoachForm.vue';

const store = useStore();

function saveData(formData) {
  store.dispatch('coaches/registerCoach', formData);
}
</script>

<template>
  <section>
    <BaseCard>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-data="saveData"></CoachForm>
    </BaseCard>
  </section>
</template>
