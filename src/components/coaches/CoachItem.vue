<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps(['id', 'firstName', 'lastName', 'rate', 'areas']);

const fullName = computed(() => {
  return `${props.firstName} ${props.lastName}`;
});

const coachContactLink = computed(() => {
  return `/coaches/${props.id}/contact`; // /coaches/c1/contact
});

const coachDetailsLink = computed(() => {
  return `/coaches/${props.id}`; // /coaches/c1
});
</script>

<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <BaseBadge
        v-for="area in areas"
        :key="area"
        :title="area"
        :type="area"
      ></BaseBadge>
    </div>
    <div class="actions">
      <BaseButton mode="outline" link :to="coachContactLink"
        >Contact</BaseButton
      >
      <BaseButton link :to="coachDetailsLink">Details</BaseButton>
    </div>
  </li>
</template>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
